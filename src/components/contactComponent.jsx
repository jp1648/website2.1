import { React, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

const SendMail = async (msg) => {
  // Accept msg as a parameter
  try {
    let x = await sgMail.send(msg);
    return x;
  } catch (error) {
    console.error("Error sending email:", error); // Log the error for debugging
    return null;
  }
};

const ContactForm = ({ formRef }) => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const message = formData.get("message");

    const msg = {
      to: "jaypat0885@gmail.com",
      from: email,
      subject: `Message from ${name}`, // Add a subject line
      text: message,
      html: `<strong>${message}</strong>`,
    };

    try {
      const result = await SendMail(msg);
      if (result) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email.");
      }
      console.log(result);
    } catch (error) {
      console.error("Error in form submission:", error); // Correctly log the error
      alert("Failed to send email.");
    }
  };

  return (
    <Box className="contact" sx={{ marginTop: "100px", textAlign: "center" }}>
      <Box>
        <Typography
          component="h1"
          sx={{ color: "lime", fontSize: "2rem", marginBottom: "20px" }}
        >
          Contact Me
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <label style={{ color: "lime", marginBottom: "10px" }}>Name</label>
          <input
            type="text"
            name="user_name"
            style={{ marginBottom: "20px", padding: "10px" }}
          />
          <label style={{ color: "lime", marginBottom: "10px" }}>Email</label>
          <input
            type="email"
            name="user_email"
            style={{ marginBottom: "20px", padding: "10px" }}
          />
          <label style={{ color: "lime", marginBottom: "10px" }}>Message</label>
          <textarea
            name="message"
            style={{ marginBottom: "20px", padding: "10px", height: "100px" }}
          />
          <Button
            type="submit"
            sx={{
              color: "black",
              padding: "10px",
              backgroundColor: "#00fc00",
              "&:hover": {
                backgroundColor: "#00cc00",
              },
            }}
          >
            Send
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactForm;
