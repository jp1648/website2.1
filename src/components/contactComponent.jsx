import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Box, Typography, Button } from "@mui/material";

const ContactForm = ({ formRef }) => {
  const [state, handleSubmit] = useForm("xkgnjejj");

  if (state.succeeded) {
    return (
      <Typography sx={{ color: "lime", marginTop: "20px" }}>
        Thank you for your message!
      </Typography>
    );
  }

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
          action="https://formspree.io/f/xkgnjejj"
          method="POST"
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <label style={{ color: "lime", marginBottom: "10px" }}>Name</label>
          <input
            type="text"
            name="user_name"
            style={{ marginBottom: "20px", padding: "10px" }}
            required
          />
          <ValidationError
            field="user_name"
            prefix="Name"
            errors={state.errors}
          />

          <label style={{ color: "lime", marginBottom: "10px" }}>Email</label>
          <input
            type="email"
            name="user_email"
            style={{ marginBottom: "20px", padding: "10px" }}
            required
          />
          <ValidationError
            field="user_email"
            prefix="Email"
            errors={state.errors}
          />

          <label style={{ color: "lime", marginBottom: "10px" }}>Message</label>
          <textarea
            name="message"
            style={{ marginBottom: "20px", padding: "10px", height: "100px" }}
            required
          />
          <ValidationError
            field="message"
            prefix="Message"
            errors={state.errors}
          />

          <Button
            type="submit"
            disabled={state.submitting}
            sx={{
              color: "black",
              padding: "10px",
              backgroundColor: "#00fc00",
              "&:hover": {
                backgroundColor: "#00cc00",
              },
            }}
          >
            {state.submitting ? "Sending..." : "Send"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ContactForm;
