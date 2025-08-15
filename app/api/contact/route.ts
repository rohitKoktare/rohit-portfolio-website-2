import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

async function sendAdminEmail(name: string, email: string, subject: string, message: string, request: NextRequest) {
  const emailHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f6f6;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
      <h2 style="color: #333;">📩 New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br>${message}</p>
      <hr>
      <p><strong>Submission Details:</strong></p>
      <p>Date: ${new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
      <p>Time: ${new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
      <p>IP Address: ${request.headers.get("x-forwarded-for") || "Unknown"}</p>
      <p>User Agent: ${request.headers.get("user-agent") || "Unknown"}</p>
      <p style="font-size: 12px; color: #888;">This email was automatically generated from the Manor & Associates website contact form.</p>
    </div>
  </div>
  `

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: 'rohitkoktarebugatti@gmail.com',
    subject: `📩 New Contact Form Submission - ${name}`,
    html: emailHtml,
    replyTo: email
  });
}

async function sendCustomerEmail(name: string, email: string) {
  const emailHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f6f6;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; text-align: center;">
      <h2 style="color: #2c3e50;">Thank you for contacting Manor & Associates, ${name}!</h2>
      <p>We have received your inquiry and our team will get back to you within 24 hours.</p>
      <p>If you have any urgent questions, feel free to reply to this email.</p>
      <hr>
      <p style="font-size: 12px; color: #888;">This is an automated confirmation email. Please do not reply directly unless necessary.</p>
    </div>
  </div>
  `

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: `✅ We've received your inquiry - Manor & Associates`,
    html: emailHtml
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Send emails
    await sendAdminEmail(name, email, subject, message, request)
    await sendCustomerEmail(name, email)

    return NextResponse.json({
      message: "Thank you for your message! Both you and the admin have received a confirmation email.",
      success: true,
    }, { status: 200 })

  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({
      error: "Error processing your request. Please try again.",
      success: false,
    }, { status: 500 })
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}



// // const express = require("express")
// // const bodyParser = require("bodyParser")
// // const cors = require("cors")
// const nodemailer = require("nodemailer")


// import { type NextRequest, NextResponse } from "next/server"
// import { resolve } from "path"

// export async function POST(request: NextRequest) {
//     try{
//         const body = await request.json()
//         const { name, email, subject, message} = body
//         console.log(name, email, subject, message)
//         if (!name || !email || !subject || !message) {
//             return NextResponse.json({ error: "All fields are required" }, { status: 400 })
//         }
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//         if (!emailRegex.test(email)) {
//              return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
//         }
//             const emailContent = `
// New Contact Form Submission - Manor & Associates Website

// Client Details:
// ================
// Name: ${name}
// Email: ${email}

// Message:
// ================
// ${message}

// Submission Details:
// ================
// Date: ${new Date().toLocaleDateString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })}
// Time: ${new Date().toLocaleTimeString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     })}
// IP Address: ${request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown"}
// User Agent: ${request.headers.get("user-agent") || "Unknown"}

// ---
// This email was automatically generated from the Manor & Associates website contact form.
// Please respond to the client directly at: ${email}
//                                     `
//         console.log("=== EMAIL WOULD BE SENT ===")
//         console.log("To: rohitkoktarebugatti@gmail.com")
//         console.log("Subject: New Contact Form Submission - " + name)
//         console.log("Content:", emailContent)
//         console.log("=== END EMAIL ===")

// // initializing nodemaler 
//         const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.GMAIL_USER,
//             pass: process.env.GMAIL_APP_PASSWORD
//         }
//         });

//         await transporter.sendMail({
//         from: process.env.GMAIL_USER,
//         to: 'rohitkoktarebugatti@gmail.com',
//         subject: `New Contact Form Submission - ${name}`,
//         text: emailContent,
//         replyTo: email
//         });

//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         return NextResponse.json(
//         {
//             message: "Thank you for your message! We have received your inquiry and will get back to you within 24 hours.",
//             success: true,
//         },
//         { status: 200 },
//         )
//         }
        
        
//         catch (error) {
//     console.error("Error processing contact form:", error)
//     return NextResponse.json(
//       {
//         error:
//           "We're sorry, but there was an error processing your request. Please try again or contact us directly at +91 9823694687.",
//         success: false,
//       },
//       { status: 500 },
//     )
//   }


// } 

// export async function OPTIONS(request: NextRequest) {
//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   })
// }
