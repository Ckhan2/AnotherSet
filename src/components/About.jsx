const About = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      
      <img 
        src="./gymbanner.jpg" 
        alt="gym banner" 
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      <h1
      
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          background: "rgba(39, 52, 68, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "80%",
          textAlign: "center"
        }}
      >
        
        Welcome to AnotherSet, your ultimate fitness destination! 
        We are dedicated to helping you achieve your health and wellness goals through 
        our state-of-the-art facilities, expert trainers, and supportive community. 
        Whether you're a beginner or a seasoned athlete, 
        we offer a wide range of classes, personalized training programs, 
        and top-notch equipment to cater to all fitness levels. 
        Join us today and take the first step towards a healthier, 
        stronger you!
        
      </h1>

  
    </div>
  );
};

export default About;