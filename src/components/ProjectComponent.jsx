import { useTheme } from "@emotion/react";
import {
  Card,
  CardMedia,
  Typography,
  Link,
  useMediaQuery,
} from "@mui/material";

const CustomComponent = ({ title, description, linkUrl, isRight = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Card
      sx={{
        bgcolor: theme.palette.primary.main,
        p: 2,
        width: { xs: "90%", sm: "80%" },
        textAlign: "center",
        borderRadius: "10px",
        marginLeft: isRight ? "auto" : { xs: "auto", sm: -1 },
        marginRight: isRight ? { xs: "auto", sm: -1 } : "auto",
      }}
    >
      <Link href={linkUrl} target="_blank" sx={{ color: "black" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "16px", sm: "24px" },
            marginBottom: 1,
          }}
        >
          {title}
        </Typography>
      </Link>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "12px", sm: "16px" },
          lineHeight: { xs: 1.4, sm: 1.6 },
          padding: { xs: "0 8px", sm: "0 16px" },
        }}
      >
        {description}
      </Typography>
    </Card>
  );
};

export default CustomComponent;
