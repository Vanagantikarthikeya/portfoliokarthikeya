import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'\-\.]+$/, 'Name contains invalid characters'),
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email too long'),
  message: z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
});

// HTML escape function to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input data
    const rawData = await req.json();
    const validation = contactSchema.safeParse(rawData);

    if (!validation.success) {
      console.error("Validation failed:", validation.error.errors);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid input data',
          details: validation.error.errors 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }

    const { name, email, message } = validation.data;

    console.log("Received contact form submission:", { name, email, message: message.substring(0, 50) + "..." });

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store the message in database
    const { data: insertData, error: insertError } = await supabaseClient
      .from('contact_messages')
      .insert({
        name,
        email,
        message,
        status: 'new'
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Failed to store contact message");
    }

    console.log("Message stored in database with id:", insertData.id);

    // Send email to you with escaped HTML to prevent XSS
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: ["vanagantikarthik@mail.com"],
      subject: `New Contact Form Message from ${escapeHtml(name)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4F46E5;">Message:</h3>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 4px;">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This message was sent through your portfolio contact form.</p>
            <p>You can reply directly to this email to respond to ${escapeHtml(name)}.</p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to the user with escaped HTML
    const confirmationResponse = await resend.emails.send({
      from: "Karthikeya Portfolio <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for your message!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4F46E5;">Thank you for reaching out!</h2>
          
          <p>Hi ${escapeHtml(name)},</p>
          
          <p>Thank you for contacting me through my portfolio. I have received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="font-style: italic;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>I typically respond within 24-48 hours. Looking forward to connecting with you!</p>
          
          <p>Best regards,<br>
          <strong>Karthikeya Vanaganti</strong></p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This is an automated confirmation email from my portfolio contact form.</p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", confirmationResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Message sent successfully",
        id: insertData.id
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send message" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);