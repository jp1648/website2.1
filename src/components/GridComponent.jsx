import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import ReactIcon from "../assets/react.png"; // Corrected file path for React icon
import AngularIcon from "../assets/angular.png"; // Assuming the path is correct
import CssIcon from "../assets/css.png"; // Corrected file path for SCSS icon
import JsIcon from "../assets/javascript.png"; // Corrected file path for JavaScript icon
import TsIcon from "../assets/ts.png"; // Corrected file path for TypeScript icon
import HtmlIcon from "../assets/html.png"; // Corrected file path for HTML icon
import NodeIcon from "../assets/node.png"; // Corrected file path for Node.js icon
import MongoIcon from "../assets/mongodb.png"; // Corrected file path for MongoDB icon
import PostIcon from "../assets/postgre.png"; // Corrected file path for PostgreSQL icon
import PythonIcon from "../assets/python.png"; // Corrected file path for Python icon
import FlaskIcon from "../assets/flask.png"; // Corrected file path for Flask icon

const technologies = [
  { name: "Javascript", Icon: JsIcon },
  { name: "Typescript", Icon: TsIcon },
  { name: "Python", Icon: PythonIcon },
  { name: "Reactjs/native", Icon: ReactIcon },
  { name: "Angular", Icon: AngularIcon },
  { name: "CSS", Icon: CssIcon },
  { name: "HTML", Icon: HtmlIcon },
  { name: "NodeJs", Icon: NodeIcon },
  { name: "Flask", Icon: FlaskIcon },
  { name: "MongoDB/NoSQL", Icon: MongoIcon },
  { name: "PostgreSQL", Icon: PostIcon },
];

const TechnologyGrid = () => {
  return (
    <Grid container spacing={2} justifyContent="center" sx={{ px: 1 }}>
      {technologies.map((tech, index) => (
        <Grid item key={index} xs={4} sm={3} md={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              padding: { xs: "4px", sm: "8px" },
              minHeight: { xs: "90px", sm: "120px" },
            }}
          >
            <img
              src={tech.Icon}
              alt={tech.name}
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "white",
                fontSize: {
                  xs: "8px",
                  sm: "12px",
                  md: "14px",
                },
                wordBreak: "break-word",
                width: "100%",
                lineHeight: 1.2,
                mt: 1,
              }}
            >
              {tech.name}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TechnologyGrid;
