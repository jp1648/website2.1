import { useState, useEffect, useRef, useMemo, createRef } from "react";
import "./App.css";
import { ReactTyped } from "react-typed";
import { Container, Typography, Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { delay, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CursorifyProvider } from "@cursorify/react";
import CustomCursor from "./components/cursor.jsx";
import profilePic from "./assets/profile-pic.png";
import TechnologyGrid from "./components/GridComponent";
import CustomComponent from "./components/ProjectComponent";
import { getGitDetails } from "./services/getGitDetails.js";
import ContactForm from "./components/contactComponent.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00fc00", // Set the primary color
    },
    secondary: {
      main: "#00fc00", // Set the secondary color
    },
  },
  typography: {
    fontFamily: "Press Start 2P",
  },
});

const floatUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const floatInFromRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};
const floatInFromLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

function alternateColors(text) {
  return text.split("").map((char, index) => (
    <span key={index} style={{ color: index % 2 === 0 ? "blue" : "orange" }}>
      {char}
    </span>
  ));
}

function App() {
  const [projects, setProjects] = useState([]);
  const [inViewProjects, setInViewProjects] = useState({});
  const [experienceText, setExperienceText] = useState(
    <ul>
      <li>
        <span style={{ color: "white" }}>August 2024 - Current</span>
        <br />
        Software Engineer @ Lantern (Series A)
      </li>
      <br />
      <li>
        <span style={{ color: "white" }}>July 2022 - August 2024</span>
        <br />
        Software Engineer @ General Motors
      </li>
      <br />
      <li>
        <span style={{ color: "white" }}>July 2023 - December 2023</span>
        <br />
        Technical Product Owner @ General Motors
      </li>
      <br />
      <li>
        <span style={{ color: "white" }}>June 2021 - August 2021</span>
        <br />
        Data Analytics Intern @ Discover Financial Services
      </li>
    </ul>
  );
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [expDescVisible, setExpDescVisible] = useState(false);

  const [allVisible, setAllVisible] = useState(false);

  const [hasAnimated, setHasAnimated] = useState({
    header: false,
    aboutMeText: false,
    aboutMeImage: false,
    techStackTitle: false,
    techIcons: false,
    projectTitle: false,
    experienceTitle: false,
    expButtons: false,
    expDesc: false,
    extendedAboutMe: false,
    extendedAboutMeP: false,
    emailForm: false,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getGitDetails();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const refsById = useMemo(() => {
    const refs = {};
    projects.forEach((item) => {
      refs[item.id] = createRef(null);
    });
    return refs;
  }, [projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { id } = entry.target.dataset;

          // Only set to true the first time it becomes visible
          if (entry.isIntersecting) {
            setInViewProjects((prev) => ({
              ...prev,
              [id]: true, // Mark the project as viewed
            }));
          }
        });
      },
      { threshold: 0.75 }
    );

    Object.values(refsById).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(refsById).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refsById]);

  const [techStackTitleRef, techStackTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.75,
  });

  const [techIconsRef, techIconsInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [projectTitleRef, projectTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [experienceTitleRef, experienceTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [expButtonsRef, expButtonsRefInView] = useInView({
    triggerOnce: true,
    threshold: 1.0,
  });
  const [expDesc, expDescInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [extendedAboutMe, extendedAboutMeInView] = useInView({
    triggerOnce: true,
    threshold: 1.0,
  });

  const [extendedAboutMeP, extendedAboutMePInView] = useInView({
    triggerOnce: true,
    threshold: 1.0,
  });

  const [experienceDescRef, experienceDescInView] = useInView({
    triggerOnce: true,
    threshold: 1.0,
  });

  const [emailForm, emailFormInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setAllVisible(true);
      }
    },
  });

  const [startTyping, setStartTyping] = useState(false);
  const [aboutMe, setAboutMe] = useState(false);
  const formRef = useRef();

  return (
    <ThemeProvider theme={theme}>
      <CursorifyProvider cursor={<CustomCursor />}>
        <Box
          component="header"
          className="App-header"
          sx={{ paddingTop: "25px" }}
        >
          <motion.header
            initial="hidden"
            animate={hasAnimated.header ? "visible" : "visible"}
            variants={floatUpVariants}
            transition={{ duration: 1 }}
            onAnimationComplete={() =>
              setHasAnimated((prev) => ({ ...prev, header: true }))
            }
          >
            <Typography
              variant="h1"
              className="title"
              sx={{
                fontSize: { xs: "40px", sm: "60px", md: "100px" },
                textAlign: "center",
              }}
            >
              Jay Patel
            </Typography>
          </motion.header>
        </Box>
        <Box
          component="div"
          className="main-screen"
          sx={{ paddingBottom: "100px" }}
        >
          <Box
            component="section"
            className="about-me"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "150px",
              marginLeft: "20px",
            }}
          >
            <Box
              className="about-me-text"
              sx={{
                marginLeft: "20px",
                marginTop: "150px",
                height: "200px",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <motion.h2
                initial="hidden"
                animate={hasAnimated.aboutMeText ? "visible" : "visible"}
                variants={floatUpVariants}
                transition={{ duration: 1, delay: 1 }}
                onAnimationComplete={() =>
                  setHasAnimated((prev) => ({ ...prev, aboutMeText: true }))
                }
              >
                <Typography variant="h2" className="subheader">
                  Driven Problem Solver
                </Typography>
              </motion.h2>

              <Typography
                variant="p"
                className="subheader-text"
                sx={{
                  display: "block",
                  whiteSpace: "normal",
                  maxWidth: "600px",
                  marginTop: "5px",
                  height: "25px",
                }}
              >
                <ReactTyped
                  strings={[
                    "I am a software engineer who likes to build cool web experiences!",
                  ]}
                  typeSpeed={7}
                  loop={false}
                  showCursor={false}
                  startDelay={2000}
                />
              </Typography>

              <Box sx={{ marginTop: "20px" }} className="view-work-button">
                <motion.button
                  initial="hidden"
                  animate={allVisible || "visible"}
                  variants={floatUpVariants}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    href="#projects"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#00cc00",
                      },
                      "&:focus": {
                        outline: "none",
                        border: "none",
                        boxShadow: "none",
                      },
                      outline: "none",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontSize="15px"
                      sx={{ fontFamily: "Tahoma", color: "black" }}
                    >
                      View My Work
                    </Typography>
                  </Button>
                </motion.button>
              </Box>
            </Box>
            <Box
              component="section"
              className="about-me-image"
              sx={{
                marginRight: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "100%", md: "30%" },
                marginTop: "50px",
              }}
            >
              <motion.img
                initial="hidden"
                animate={hasAnimated.aboutMeImage ? "visible" : "visible"}
                variants={floatInFromRightVariants}
                transition={{ duration: 1, delay: 1 }}
                onAnimationComplete={() =>
                  setHasAnimated((prev) => ({ ...prev, aboutMeImage: true }))
                }
                src={profilePic}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "auto",
                  borderRadius: "2%",
                }}
              ></motion.img>
            </Box>
          </Box>
          <Box
            component="section"
            className="teck-stack"
            sx={{ marginTop: "250px", textAlign: "center" }}
          >
            <motion.h2
              ref={techStackTitleRef}
              initial="hidden"
              animate={techStackTitleInView ? "visible" : "hidden"}
              variants={floatUpVariants}
              transition={{ duration: 1 }}
              onAnimationComplete={() =>
                setHasAnimated((prev) => ({ ...prev, techStackTitle: true }))
              }
            >
              <Typography variant="h2" className="subheader">
                Tech Stack
              </Typography>
            </motion.h2>
            <Box
              component="section"
              className="tech-stack-icons"
              sx={{
                marginTop: "50px",
                marginbottom: "50px",
                textAlign: "center",
                overflow: "visible",
              }}
            >
              <motion.div
                ref={techIconsRef}
                initial="hidden"
                animate={techIconsInView ? "visible" : "hidden"}
                variants={floatUpVariants}
                transition={{ duration: 1, delay: 0.3 }}
                onAnimationComplete={() =>
                  setHasAnimated((prev) => ({ ...prev, techIcons: true }))
                }
              >
                <TechnologyGrid />
              </motion.div>
            </Box>
          </Box>
          <Box
            component="section"
            id="projects"
            className="projects"
            sx={{ marginTop: "300px", textAlign: "center" }} // Increased marginTop to move it down
          >
            <motion.h2
              ref={projectTitleRef}
              initial="hidden"
              animate={projectTitleInView ? "visible" : "hidden"}
              variants={floatUpVariants}
              transition={{ duration: 1 }}
              onAnimationComplete={() =>
                setHasAnimated((prev) => ({ ...prev, projectTitle: true }))
              }
            >
              <Typography variant="h2" className="subheader">
                My Projects
              </Typography>
            </motion.h2>
            <Box
              component="section"
              className="project-list"
              marginTop="50px"
              sx={{
                textAlign: "center",
                overflow: "visible",
              }}
            >
              {projects.map((project, index) => {
                const ref = refsById[project.id];
                const isVisible = inViewProjects[project.id]; // Check if the project is already viewed

                return (
                  <motion.div
                    key={index}
                    ref={ref}
                    data-id={project.id}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"} // Animate only if it's the first time in view
                    variants={
                      index % 2 === 0
                        ? floatInFromRightVariants
                        : floatInFromLeftVariants
                    }
                    transition={{ duration: 1, delay: index * 0.2 }}
                    onAnimationComplete={() =>
                      setHasAnimated((prev) => ({
                        ...prev,
                        projectTitle: true,
                      }))
                    }
                  >
                    <Box sx={{ marginBottom: "50px" }}>
                      <CustomComponent
                        title={project.name}
                        description={project.description}
                        linkUrl={project.url}
                        isRight={index % 2 === 0}
                      />
                    </Box>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
          <Box
            component="section"
            id="experience"
            className="experience-section"
            sx={{
              marginTop: "300px",
              textAlign: "center",
            }}
          >
            <Box
              component="h1"
              id="experience-title"
              className="experience-title"
              sx={{ textAlign: "center" }}
            >
              <motion.h2
                ref={experienceTitleRef}
                initial="hidden"
                animate={experienceTitleInView ? "visible" : "hidden"}
                variants={floatUpVariants}
                transition={{ duration: 1, delay: 0.5 }} // Add delay for the title
                onAnimationComplete={() =>
                  setHasAnimated((prev) => ({ ...prev, experienceTitle: true }))
                }
              >
                <Typography variant="h2" className="subheader">
                  My Experience
                </Typography>
              </motion.h2>
            </Box>
            <Box
              className="experience-div"
              component="section"
              sx={{
                marginTop: "25px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "600px",
              }}
            >
              <Box sx={{ height: "80px", maxWidth: "80%" }}>
                <motion.p
                  ref={experienceDescRef}
                  initial="hidden"
                  animate={experienceDescInView ? "visible" : "hidden"}
                  variants={floatUpVariants}
                  transition={{ duration: 1, delay: 1.0 }} // Ensure this delay is before buttons
                  onAnimationComplete={() =>
                    setHasAnimated((prev) => ({
                      ...prev,
                      experienceDesc: true,
                    }))
                  }
                >
                  <Typography
                    variant="p"
                    className="desc-subheader-text"
                    sx={{
                      whiteSpace: "normal",
                    }}
                  >
                    I’m always diving into tech, soaking up everything from
                    full-stack development to machine learning, data science,
                    and product. Tech is my playground, and I’m stoked to keep
                    making things smarter and better for everyone.
                  </Typography>
                </motion.p>
              </Box>

              <Box
                component="section"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-evenly",
                  marginTop: "20px",
                  width: "75%",
                }}
                className="tabs"
              >
                <motion.button
                  ref={expButtonsRef}
                  initial="hidden"
                  animate={expButtonsRefInView ? "visible" : "hidden"}
                  variants={floatUpVariants}
                  transition={{ duration: 1, delay: 1.0 }} // Delay after description
                  onAnimationComplete={() =>
                    setHasAnimated((prev) => ({ ...prev, expButtons: true }))
                  }
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setExperienceText(
                        <ul sx={{ margin: 0, padding: 0, listStyle: "none" }}>
                          <li>
                            <span style={{ color: "white" }}>
                              August 2024 - Current
                            </span>
                            <br />
                            Software Engineer @ Lantern (Series A)
                          </li>
                          <br />
                          <li>
                            <span style={{ color: "white" }}>
                              July 2022 - August 2024
                            </span>
                            <br />
                            Software Engineer @ General Motors
                          </li>
                          <br />
                          <li>
                            <span style={{ color: "white" }}>
                              July 2023 - December 2023
                            </span>
                            <br />
                            Technical Product Owner @ General Motors
                          </li>
                          <br />
                          <li>
                            <span style={{ color: "white" }}>
                              June 2021 - August 2021
                            </span>
                            <br />
                            Data Analytics Intern @ Discover Financial Services
                          </li>
                        </ul>
                      )
                    }
                  >
                    Work Experience
                  </Button>
                </motion.button>
                <motion.button
                  ref={expButtonsRef}
                  initial="hidden"
                  animate={expButtonsRefInView ? "visible" : "hidden"}
                  variants={floatUpVariants}
                  transition={{ duration: 1, delay: 1.0 }}
                  onAnimationComplete={() =>
                    setHasAnimated((prev) => ({ ...prev, expButtons: true }))
                  }
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setExperienceText(
                        <ul sx={{ margin: 0, padding: 0, listStyle: "none" }}>
                          <li>
                            <span style={{ color: "white" }}>
                              January 2023 - August 2024
                            </span>
                            <br />
                            Master of Science in Computer Science | Stevens
                            Institute of Technology
                          </li>
                          <br />
                          <li>
                            <span style={{ color: "white" }}>
                              September 2018 - May 2022
                            </span>
                            <br />
                            Business Analytics & Information Technology |
                            Rutgers University - New Brunswick
                          </li>
                          <br />
                          <li>
                            <span style={{ color: "white" }}>
                              September 2018 - May 2022
                            </span>
                            <br />
                            Finance | Rutgers University - New Brunswick
                          </li>
                        </ul>
                      )
                    }
                  >
                    Education History
                  </Button>
                </motion.button>
              </Box>

              <Box
                sx={{
                  marginTop: "30px",
                  marginBottom: "150px",
                }}
                className="experience-p"
              >
                <motion.p
                  initial="hidden"
                  ref={expDesc}
                  animate={expDescInView ? "visible" : "hidden"}
                  variants={floatUpVariants}
                  transition={{ duration: 1, delay: 0.5 }}
                  onAnimationComplete={() =>
                    setHasAnimated((prev) => ({ ...prev, expDesc: true }))
                  }
                >
                  <Typography component="body">{experienceText}</Typography>
                </motion.p>
              </Box>
            </Box>
            <Box
              className="extended-about"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className="extended-about-me-text-header" sx={{}}>
                <motion.h2
                  initial="hidden"
                  variants={floatUpVariants}
                  transition={{ duration: 1 }}
                  ref={extendedAboutMe}
                  animate={extendedAboutMeInView ? "visible" : "hidden"}
                  onAnimationComplete={() =>
                    setHasAnimated((prev) => ({
                      ...prev,
                      extendedAboutMe: true,
                    }))
                  }
                >
                  <Typography
                    sx={{ fontSize: "10px" }}
                    variant="h2"
                    className="subheader"
                  >
                    About Me
                  </Typography>
                </motion.h2>
              </Box>

              <Box
                className="extender-about-me-text"
                sx={{
                  maxWidth: "80%",
                  display: "flex",
                }}
              >
                <motion.p
                  initial="hidden"
                  variants={floatUpVariants}
                  transition={{ duration: 1 }}
                  ref={extendedAboutMeP}
                  animate={extendedAboutMePInView ? "visible" : "hidden"}
                  onAnimationComplete={() =>
                    setHasAnimated((prev) => ({
                      ...prev,
                      extendedAboutMeP: true,
                    }))
                  }
                >
                  <Typography variant="body1" className="about-ext-subheader">
                    Hi! As you know by now, my name is Jay Patel and I am a
                    Software Engineer. Software is my passion and I love to
                    build projects simply for fun, and I am currently in the mix
                    of making two major projects. Currently, I work for a Series
                    A B2B SaaS startup based in New York City called Lantern,
                    and here I primarily work with TypeScript and JavaScript for
                    both frontend and backend. While our frontend is mostly
                    React, our backend is Node.js, and these are two frameworks
                    that I love to work with. At Lantern, I primarily deal with
                    engineering client-side products, sometimes uniquely
                    creating workflows for individual businesses, and sometimes
                    creating new features that directly impact the customer.
                    When I am not working on engineering, some of my favorite
                    hobbies include weightlifting, watching{" "}
                    {alternateColors("Knicks")} basketball, playing with my
                    lovely pet Corgi, and spending time with friends and family.
                    This is actually my second portfolio website, and it is made
                    entirely with React, while my first one was just HTML, CSS,
                    and Vanilla JavaScript. This website's theme is based on a
                    retro space invaders vibe, and I really hope you like it as
                    much as I do.
                  </Typography>
                </motion.p>
              </Box>
            </Box>
            <motion.form
              initial="hidden"
              variants={floatUpVariants}
              transition={{ duration: 1 }}
              ref={emailForm}
              animate={allVisible || emailFormInView ? "visible" : "hidden"}
              onAnimationComplete={() =>
                setHasAnimated((prev) => ({ ...prev, emailForm: true }))
              }
            >
              <ContactForm formRef={formRef}></ContactForm>
            </motion.form>
          </Box>
        </Box>
        <footer className="footer">
          <p>© 2024 Jay's Portfolio | Built with React</p>
        </footer>
      </CursorifyProvider>
    </ThemeProvider>
  );
}

export default App;
