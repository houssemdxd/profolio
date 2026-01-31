import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SophisticatedPortfolio() {
  const mountRef = useRef(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [nearbyProject, setNearbyProject] = useState(null);
  const [showProfile, setShowProfile] = useState(true);
  const [speed, setSpeed] = useState(0);
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const carGroupRef = useRef(null);
  const wheelsRef = useRef([]);
  const keysPressed = useRef({});
  const carVelocity = useRef({ x: 0, z: 0 });
  const carRotation = useRef(0);

  const profileData = {
    name: "Houssem Eddine Khalfaoui",
    title: "Full-Stack Software Engineer",
    location: "Germany 🇩🇪",
    phone: "+49 155 11328009",
    email: "khalfaouihoussemeddine94@gmail.com",
    github: "github.com/houssemdxd",
    linkedin: "linkedin.com/in/houssem-khalfaoui-499389254",
    skills: {
      languages: ["TypeScript", "JavaScript", "Java", "C#", "PHP", "SQL"],
      frontend: ["React", "Tailwind CSS"],
      backend: ["NestJS", "Symfony", "ASP.NET Core", "Spring Boot", "REST APIs", "JWT/OAuth"],
      databases: ["MySQL", "PostgreSQL", "MongoDB", "EF Core"],
      tools: ["Git", "Docker", "Postman", "Jira", "CI/CD"]
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Vision Age VFX',
      type: 'Internship',
      period: 'Sep 2025 - Nov 2025',
      tech: ['NestJS', 'REST API', 'TypeScript'],
      description: 'Built backend services for media streaming platform supporting 500+ concurrent users with session management and performance optimizations.',
      icon: '🎬',
      color: '#FF6B6B',
      position: { x: -15, z: -30 },
      buildingType: 'internship',
      achievements: ['500+ concurrent users', 'REST APIs', 'Performance optimization']
    },
    {
      id: 2,
      title: 'Innovation and Decision',
      type: 'Internship',
      period: 'Jun 2025 - Aug 2025',
      tech: ['NestJS', 'React', 'IoT'],
      description: 'Developed backend APIs for IoT smart parking system with real-time device communication and React dashboard.',
      icon: '🅿️',
      color: '#4ECDC4',
      position: { x: 15, z: -50 },
      buildingType: 'internship',
      achievements: ['IoT integration', 'Real-time communication', 'React dashboard']
    },
    {
      id: 3,
      title: "L'Enizo (LATIS)",
      type: 'Internship',
      period: 'Feb 2023 - Jun 2023',
      tech: ['ASP.NET Core', 'EF Core', 'MySQL'],
      description: 'Implemented backend for medical imaging platform, reducing false interpretation errors by 11% with optimized procedures.',
      icon: '🏥',
      color: '#FFE66D',
      position: { x: -15, z: -70 },
      buildingType: 'internship',
      achievements: ['11% error reduction', 'Medical imaging', 'EF Core & MySQL']
    },
    {
      id: 4,
      title: 'Tido',
      type: 'Internship',
      period: 'Jul 2024 - Aug 2024',
      tech: ['React', 'QA Testing', 'UI Components'],
      description: 'Developed React UI components and performed comprehensive quality assurance testing.',
      icon: '⚛️',
      color: '#A8E6CF',
      position: { x: 15, z: -90 },
      buildingType: 'internship',
      achievements: ['React components', 'QA testing', 'UI development']
    },
    {
      id: 5,
      title: 'Airport Reservation System',
      type: 'Project',
      period: '2024',
      tech: ['ASP.NET Core MVC', 'EF Core', 'SQL Server', 'C#'],
      description: 'Web application for flight booking with passenger management, flight scheduling, and seat selection.',
      icon: '✈️',
      color: '#95E1D3',
      position: { x: 0, z: -120 }, // Straight on road
      buildingType: 'project',
      achievements: ['Flight booking', 'Passenger management', 'Seat selection'],
      githubUrl: 'https://github.com/houssemdxd/Aireport-reservationSystem'
    },
    {
      id: 6,
      title: 'RadioHub',
      type: 'Project',
      period: '2024',
      tech: ['Symfony', 'JavaFX', 'MySQL', 'JWT'],
      description: 'Medical image collaboration platform with secure upload, annotations, and role-based access. Best Project Selection 2024.',
      icon: '🏆',
      color: '#F38181',
      position: { x: 0, z: -140 }, // Straight on road
      buildingType: 'project',
      achievements: ['Best Project 2024', 'JWT auth', 'Role-based access'],
      githubUrl: 'https://github.com/iconalaa/RadioHub-Symfony',
      githubUrlJava: 'https://github.com/iconalaa/RadioHub-Java'
    },
    {
      id: 7,
      title: 'WorldWise',
      type: 'Project',
      period: '2024',
      tech: ['React', 'Routing', 'Components'],
      description: 'Travel tracking app to log trips using reusable components and routing.',
      icon: '🌍',
      color: '#FF9A76',
      position: { x: 0, z: -160 }, // Straight on road
      buildingType: 'project',
      achievements: ['React routing', 'Reusable components', 'Travel tracking'],
      githubUrl: 'https://github.com/houssemdxd/World-Wise'
    }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup - Morning desert
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf4e4c1, 30, 150);
    sceneRef.current = scene;

    // Camera - Behind and above view (normal driving perspective)
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 12, 18); // Behind and elevated
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Morning desert sky with sunrise
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          // Morning sunrise colors - warm desert palette
          vec3 skyTop = vec3(0.6, 0.75, 0.95); // Light blue
          vec3 skyHorizon = vec3(1.0, 0.85, 0.65); // Warm peach/orange
          vec3 skyColor = mix(skyHorizon, skyTop, max(pow(h, 0.6), 0.0));
          
          // Add sun glow
          vec3 sunDir = normalize(vec3(0.3, 0.3, -1.0));
          float sun = pow(max(dot(normalize(vWorldPosition), sunDir), 0.0), 15.0);
          skyColor += vec3(1.0, 0.9, 0.7) * sun * 0.9;
          
          gl_FragColor = vec4(skyColor, 1.0);
        }
      `,
      uniforms: {
        time: { value: 0 }
      },
      side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    // Morning sun lighting - warm and bright
    const ambientLight = new THREE.AmbientLight(0xfff4e0, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.3);
    sunLight.position.set(50, 50, -50);
    sunLight.castShadow = true;
    sunLight.shadow.camera.left = -100;
    sunLight.shadow.camera.right = 100;
    sunLight.shadow.camera.top = 100;
    sunLight.shadow.camera.bottom = -100;
    sunLight.shadow.mapSize.width = 4096;
    sunLight.shadow.mapSize.height = 4096;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    // Warm hemisphere light for desert atmosphere
    const hemiLight = new THREE.HemisphereLight(0xffeaa7, 0xd4a574, 0.6);
    scene.add(hemiLight);

    // Desert sand ground - flat and straight
    const groundSize = 300;
    const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize, 100, 100);
    
    // Flat desert - no dunes in the projects section
    const vertices = groundGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      // Only add subtle dunes before projects section (z > -100)
      if (y > -100) {
        vertices[i + 2] = Math.sin(x * 0.02) * Math.cos(y * 0.015) * 2.5 + 
                          Math.sin(x * 0.05) * Math.cos(y * 0.04) * 1.2;
      } else {
        // Flat for projects section
        vertices[i + 2] = 0;
      }
    }
    groundGeometry.computeVertexNormals();

    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4a574, // Sandy desert color
      roughness: 0.95,
      metalness: 0,
    });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create clear desert path with visible edges
    const roadWidth = 10;
    const roadLength = 200;
    const roadGeometry = new THREE.PlaneGeometry(roadWidth, roadLength, 50, 100);
    
    const roadVertices = roadGeometry.attributes.position.array;
    for (let i = 0; i < roadVertices.length; i += 3) {
      roadVertices[i + 2] = 0.08;
    }
    
    const roadMaterial = new THREE.MeshStandardMaterial({
      color: 0xb8956a, // Clearer dirt path color
      roughness: 0.85,
      metalness: 0
    });
    
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.receiveShadow = true;
    scene.add(road);

    // Clear road edge markers (bigger stones/barriers)
    const createRoadEdge = (x) => {
      const edgeGeometry = new THREE.BoxGeometry(0.8, 0.5, 1);
      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0x6b5d52,
        roughness: 1
      });
      
      for (let i = -100; i < 100; i += 6) {
        const marker = new THREE.Mesh(edgeGeometry, edgeMaterial);
        marker.position.set(x, 0.25, i);
        marker.rotation.y = Math.random() * 0.3;
        marker.castShadow = true;
        scene.add(marker);
      }
    };

    createRoadEdge(-roadWidth / 2);
    createRoadEdge(roadWidth / 2);
    
    // Center line for guidance
    for (let i = -100; i < 100; i += 8) {
      const lineGeometry = new THREE.PlaneGeometry(0.3, 4);
      const lineMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6
      });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.rotation.x = -Math.PI / 2;
      line.position.set(0, 0.09, i);
      scene.add(line);
    }

    // Create a desert SUV/Jeep
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;

    const vehicleColor = 0x8B7355; // Desert tan/beige
    const vehicleMaterial = new THREE.MeshStandardMaterial({
      color: vehicleColor,
      roughness: 0.7,
      metalness: 0.3
    });

    // Main body
    const bodyGeometry = new THREE.BoxGeometry(2, 1.2, 4);
    const body = new THREE.Mesh(bodyGeometry, vehicleMaterial);
    body.position.y = 1.2;
    body.castShadow = true;
    carGroup.add(body);

    // Hood
    const hoodGeometry = new THREE.BoxGeometry(2, 0.3, 1);
    const hood = new THREE.Mesh(hoodGeometry, vehicleMaterial);
    hood.position.set(0, 1.75, 1.5);
    hood.castShadow = true;
    carGroup.add(hood);

    // Cabin/Roof
    const cabinGeometry = new THREE.BoxGeometry(1.8, 1, 2);
    const cabin = new THREE.Mesh(cabinGeometry, vehicleMaterial);
    cabin.position.set(0, 2.3, -0.3);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Windshield
    const windshieldGeometry = new THREE.PlaneGeometry(1.7, 0.8);
    const windshieldMaterial = new THREE.MeshStandardMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });
    const windshield = new THREE.Mesh(windshieldGeometry, windshieldMaterial);
    windshield.position.set(0, 2.3, 0.85);
    windshield.rotation.x = -0.15;
    carGroup.add(windshield);

    // Side windows
    [-0.95, 0.95].forEach(x => {
      const sideWindow = new THREE.PlaneGeometry(1.5, 0.7);
      const window = new THREE.Mesh(sideWindow, windshieldMaterial);
      window.position.set(x, 2.3, -0.3);
      window.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
      carGroup.add(window);
    });

    // Wheels - large off-road tires
    const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.9
    });

    const wheelPositions = [
      [-1.1, 0.5, 1.4],
      [1.1, 0.5, 1.4],
      [-1.1, 0.5, -1.4],
      [1.1, 0.5, -1.4]
    ];

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(...pos);
      wheel.castShadow = true;
      carGroup.add(wheel);
      wheelsRef.current.push(wheel);
    });

    // Headlights
    [-0.7, 0.7].forEach(x => {
      const headlightGeometry = new THREE.CircleGeometry(0.2, 16);
      const headlightMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffcc,
        emissive: 0xffffcc,
        emissiveIntensity: 0.5
      });
      const headlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
      headlight.position.set(x, 1.2, 2.05);
      carGroup.add(headlight);
    });

    // Grille
    const grilleGeometry = new THREE.BoxGeometry(1.6, 0.4, 0.1);
    const grilleMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8
    });
    const grille = new THREE.Mesh(grilleGeometry, grilleMaterial);
    grille.position.set(0, 1, 2.05);
    carGroup.add(grille);

    // Roof rack
    const rackGeometry = new THREE.BoxGeometry(1.6, 0.1, 1.8);
    const rackMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.6,
      metalness: 0.5
    });
    const rack = new THREE.Mesh(rackGeometry, rackMaterial);
    rack.position.set(0, 2.9, -0.3);
    carGroup.add(rack);

    // Spare tire on back
    const spareTireGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
    const spareTire = new THREE.Mesh(spareTireGeometry, wheelMaterial);
    spareTire.rotation.x = Math.PI / 2;
    spareTire.position.set(0, 1.5, -2.1);
    carGroup.add(spareTire);

    // Bumpers
    const bumperGeometry = new THREE.BoxGeometry(2.2, 0.2, 0.3);
    const bumperMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.7,
      metalness: 0.4
    });
    
    const frontBumper = new THREE.Mesh(bumperGeometry, bumperMaterial);
    frontBumper.position.set(0, 0.7, 2.2);
    carGroup.add(frontBumper);

    const rearBumper = new THREE.Mesh(bumperGeometry, bumperMaterial);
    rearBumper.position.set(0, 0.7, -2.2);
    carGroup.add(rearBumper);

    carGroup.position.set(0, 0, 10);
    scene.add(carGroup);

    // Create project buildings with better visibility
    function createBuilding(project) {
      const buildingGroup = new THREE.Group();

      if (project.buildingType === 'internship') {
        // Create a 3D human figure for internships
        const humanGroup = new THREE.Group();
        
        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.8, 1, 3, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({
          color: project.color,
          metalness: 0.3,
          roughness: 0.7
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 3;
        body.castShadow = true;
        humanGroup.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.8, 16, 16);
        const headMaterial = new THREE.MeshStandardMaterial({
          color: 0xffdbac,
          roughness: 0.8
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 5.3;
        head.castShadow = true;
        humanGroup.add(head);

        // Arms
        const armGeometry = new THREE.CylinderGeometry(0.25, 0.25, 2.5, 8);
        const armMaterial = new THREE.MeshStandardMaterial({
          color: project.color,
          metalness: 0.3,
          roughness: 0.7
        });

        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-1.2, 3.5, 0);
        leftArm.rotation.z = 0.3;
        leftArm.castShadow = true;
        humanGroup.add(leftArm);

        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(1.2, 3.5, 0);
        rightArm.rotation.z = -0.3;
        rightArm.castShadow = true;
        humanGroup.add(rightArm);

        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 8);
        const legMaterial = new THREE.MeshStandardMaterial({
          color: 0x2a2a3e,
          roughness: 0.8
        });

        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.5, 0.5, 0);
        leftLeg.castShadow = true;
        humanGroup.add(leftLeg);

        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.5, 0.5, 0);
        rightLeg.castShadow = true;
        humanGroup.add(rightLeg);

        // Laptop in hands (for tech work)
        const laptopGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.9);
        const laptopMaterial = new THREE.MeshStandardMaterial({
          color: 0x333333,
          metalness: 0.8,
          roughness: 0.2
        });
        const laptop = new THREE.Mesh(laptopGeometry, laptopMaterial);
        laptop.position.set(0, 2.5, 0.6);
        laptop.rotation.x = -0.3;
        humanGroup.add(laptop);

        // Laptop screen
        const screenGeometry = new THREE.BoxGeometry(1.15, 0.85, 0.05);
        const screenMaterial = new THREE.MeshStandardMaterial({
          color: project.color,
          emissive: project.color,
          emissiveIntensity: 0.5
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 3.1, 0.2);
        screen.rotation.x = 0.2;
        humanGroup.add(screen);

        humanGroup.scale.set(1.5, 1.5, 1.5);
        humanGroup.position.y = 0;
        buildingGroup.add(humanGroup);

        // Platform for human
        const platformGeometry = new THREE.CylinderGeometry(3, 3.5, 0.5, 32);
        const platformMaterial = new THREE.MeshStandardMaterial({
          color: project.color,
          metalness: 0.6,
          roughness: 0.4,
          emissive: project.color,
          emissiveIntensity: 0.2
        });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.position.y = 0.25;
        platform.castShadow = true;
        buildingGroup.add(platform);

        // Info sign above human with company name
        const signGeometry = new THREE.BoxGeometry(5, 2.5, 0.2);
        const signMaterial = new THREE.MeshStandardMaterial({
          color: 0x1a1a2e,
          metalness: 0.3,
          roughness: 0.7
        });
        const sign = new THREE.Mesh(signGeometry, signMaterial);
        sign.position.y = 11;
        sign.castShadow = true;
        buildingGroup.add(sign);

        // Create canvas for text
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const context = canvas.getContext('2d');
        
        // Fill background
        context.fillStyle = '#1a1a2e';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw company name
        context.fillStyle = project.color;
        context.font = 'bold 80px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Split title into multiple lines if too long
        const words = project.title.split(' ');
        let line = '';
        let lines = [];
        let maxWidth = 900;
        
        for (let n = 0; n < words.length; n++) {
          let testLine = line + words[n] + ' ';
          let metrics = context.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line);
        
        // Draw lines
        const lineHeight = 90;
        const startY = (canvas.height / 2) - ((lines.length - 1) * lineHeight / 2);
        lines.forEach((line, i) => {
          context.fillText(line.trim(), canvas.width / 2, startY + (i * lineHeight));
        });
        
        // Add icon
        context.font = '100px Arial';
        context.fillText(project.icon, canvas.width / 2, startY + (lines.length * lineHeight) + 50);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true
        });
        
        // Apply texture to sign front
        const textPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(5, 2.5),
          textMaterial
        );
        textPlane.position.set(0, 11, 0.11);
        buildingGroup.add(textPlane);

        // Sign border
        const borderGeometry = new THREE.BoxGeometry(5.2, 2.7, 0.15);
        const borderMaterial = new THREE.MeshStandardMaterial({
          color: project.color,
          emissive: project.color,
          emissiveIntensity: 0.5
        });
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.set(0, 11, -0.15);
        buildingGroup.add(border);

        // Sign post
        const postGeometry = new THREE.CylinderGeometry(0.2, 0.2, 9, 16);
        const postMaterial = new THREE.MeshStandardMaterial({
          color: 0x555555,
          metalness: 0.7,
          roughness: 0.3
        });
        const post = new THREE.Mesh(postGeometry, postMaterial);
        post.position.y = 6;
        post.castShadow = true;
        buildingGroup.add(post);

      } else if (project.buildingType === 'project') {
        // Different 3D shapes for different projects
        let mainShape;

        if (project.icon === '✈️') {
          // Airplane shape for Airport project
          const planeGroup = new THREE.Group();
          
          // Fuselage
          const fuselageGeometry = new THREE.CylinderGeometry(1, 1, 8, 16);
          const fuselageMaterial = new THREE.MeshStandardMaterial({
            color: project.color,
            metalness: 0.8,
            roughness: 0.2
          });
          const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
          fuselage.rotation.z = Math.PI / 2;
          fuselage.position.y = 5;
          fuselage.castShadow = true;
          planeGroup.add(fuselage);

          // Wings
          const wingGeometry = new THREE.BoxGeometry(12, 0.3, 2);
          const wing = new THREE.Mesh(wingGeometry, fuselageMaterial);
          wing.position.y = 5;
          wing.castShadow = true;
          planeGroup.add(wing);

          // Tail
          const tailGeometry = new THREE.BoxGeometry(0.3, 3, 2);
          const tail = new THREE.Mesh(tailGeometry, fuselageMaterial);
          tail.position.set(0, 6.5, -3.5);
          tail.castShadow = true;
          planeGroup.add(tail);

          mainShape = planeGroup;

        } else if (project.icon === '🏆') {
          // Trophy shape for award-winning project
          const trophyGroup = new THREE.Group();
          
          // Cup
          const cupGeometry = new THREE.CylinderGeometry(2, 1.5, 5, 32);
          const cupMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            metalness: 1,
            roughness: 0.1,
            emissive: 0xFFD700,
            emissiveIntensity: 0.3
          });
          const cup = new THREE.Mesh(cupGeometry, cupMaterial);
          cup.position.y = 6;
          cup.castShadow = true;
          trophyGroup.add(cup);

          // Handles
          const handleGeometry = new THREE.TorusGeometry(1.5, 0.3, 16, 32);
          const leftHandle = new THREE.Mesh(handleGeometry, cupMaterial);
          leftHandle.position.set(-2, 6, 0);
          leftHandle.rotation.y = Math.PI / 2;
          trophyGroup.add(leftHandle);

          const rightHandle = new THREE.Mesh(handleGeometry, cupMaterial);
          rightHandle.position.set(2, 6, 0);
          rightHandle.rotation.y = Math.PI / 2;
          trophyGroup.add(rightHandle);

          // Base
          const baseGeometry = new THREE.CylinderGeometry(2.5, 3, 1, 32);
          const base = new THREE.Mesh(baseGeometry, cupMaterial);
          base.position.y = 2;
          base.castShadow = true;
          trophyGroup.add(base);

          // Stem
          const stemGeometry = new THREE.CylinderGeometry(0.8, 1, 2, 32);
          const stem = new THREE.Mesh(stemGeometry, cupMaterial);
          stem.position.y = 3.5;
          trophyGroup.add(stem);

          mainShape = trophyGroup;

        } else if (project.icon === '🌍') {
          // Globe shape for WorldWise
          const globeGeometry = new THREE.SphereGeometry(3, 32, 32);
          const globeMaterial = new THREE.MeshStandardMaterial({
            color: project.color,
            metalness: 0.5,
            roughness: 0.5,
            emissive: project.color,
            emissiveIntensity: 0.3
          });
          mainShape = new THREE.Mesh(globeGeometry, globeMaterial);
          mainShape.position.y = 5;
          mainShape.castShadow = true;

          // Add latitude/longitude lines
          const linesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
          for (let i = 0; i < 6; i++) {
            const curve = new THREE.EllipseCurve(0, 0, 3, 3, 0, 2 * Math.PI);
            const points = curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, linesMaterial);
            line.rotation.x = (i * Math.PI) / 6;
            line.position.y = 5;
            mainShape.add(line);
          }
        }

        if (mainShape) {
          buildingGroup.add(mainShape);
        }

        // Platform
        const platformGeometry = new THREE.CylinderGeometry(4, 4.5, 1, 32);
        const platformMaterial = new THREE.MeshStandardMaterial({
          color: project.color,
          metalness: 0.6,
          roughness: 0.4,
          emissive: project.color,
          emissiveIntensity: 0.2
        });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.position.y = 0.5;
        platform.castShadow = true;
        buildingGroup.add(platform);

        // Add project name label
        const labelCanvas = document.createElement('canvas');
        labelCanvas.width = 1024;
        labelCanvas.height = 256;
        const labelContext = labelCanvas.getContext('2d');
        
        // Fill background
        labelContext.fillStyle = project.color;
        labelContext.fillRect(0, 0, labelCanvas.width, labelCanvas.height);
        
        // Draw text
        labelContext.fillStyle = '#ffffff';
        labelContext.font = 'bold 70px Arial';
        labelContext.textAlign = 'center';
        labelContext.textBaseline = 'middle';
        labelContext.fillText(project.title, labelCanvas.width / 2, labelCanvas.height / 2);
        
        // Create texture from canvas
        const labelTexture = new THREE.CanvasTexture(labelCanvas);
        const labelMaterial = new THREE.MeshBasicMaterial({
          map: labelTexture,
          transparent: true
        });
        
        // Create label plane
        const labelPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(6, 1.5),
          labelMaterial
        );
        labelPlane.position.set(0, 10, 0);
        buildingGroup.add(labelPlane);
      }

      // Glow effect for all types
      const glowGeometry = new THREE.SphereGeometry(5, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: project.color,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.y = 5;
      buildingGroup.add(glow);

      // Spotlight from above
      const spotlight = new THREE.SpotLight(project.color, 4, 40, Math.PI / 4, 0.5);
      spotlight.position.set(0, 25, 0);
      spotlight.castShadow = true;
      buildingGroup.add(spotlight);

      // Point light at base
      const pointLight = new THREE.PointLight(project.color, 3, 25);
      pointLight.position.set(0, 1, 0);
      buildingGroup.add(pointLight);

      // Vertical light beam
      const beamGeometry = new THREE.CylinderGeometry(0.5, 2, 25, 32, 1, true);
      const beamMaterial = new THREE.MeshBasicMaterial({
        color: project.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.y = 12.5;
      buildingGroup.add(beam);

      buildingGroup.position.set(project.position.x, 0, project.position.z);
      buildingGroup.userData = project;
      
      return buildingGroup;
    }

    // Add all project buildings
    projects.forEach(project => {
      const building = createBuilding(project);
      scene.add(building);
    });

    // Add section markers
    // "INTERNSHIPS" section sign
    const internshipsMarker = createSectionMarker('INTERNSHIPS', '💼', '#9b59b6', -20);
    scene.add(internshipsMarker);

    // "PROJECTS" section sign (before first project)
    const projectsMarker = createSectionMarker('PROJECTS', '🚀', '#27ae60', -105);
    scene.add(projectsMarker);

    // Function to create section markers
    function createSectionMarker(title, icon, color, zPosition) {
      const markerGroup = new THREE.Group();

      // Large sign board
      const signGeometry = new THREE.BoxGeometry(12, 4, 0.3);
      const signMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        metalness: 0.4,
        roughness: 0.6
      });
      const sign = new THREE.Mesh(signGeometry, signMaterial);
      sign.position.y = 6;
      sign.castShadow = true;
      markerGroup.add(sign);

      // Border
      const borderGeometry = new THREE.BoxGeometry(12.3, 4.3, 0.25);
      const borderMaterial = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.6
      });
      const border = new THREE.Mesh(borderGeometry, borderMaterial);
      border.position.set(0, 6, -0.2);
      markerGroup.add(border);

      // Create canvas for text
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      
      // Fill background
      context.fillStyle = '#1a1a2e';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw section title
      context.fillStyle = color;
      context.font = 'bold 140px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(title, canvas.width / 2, canvas.height / 2 - 40);
      
      // Draw icon
      context.font = '150px Arial';
      context.fillText(icon, canvas.width / 2, canvas.height / 2 + 100);
      
      // Add decorative line
      context.strokeStyle = color;
      context.lineWidth = 8;
      context.beginPath();
      context.moveTo(400, canvas.height / 2 - 120);
      context.lineTo(1648, canvas.height / 2 - 120);
      context.stroke();
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      const textMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
      });
      
      // Apply texture to sign front
      const textPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(12, 4),
        textMaterial
      );
      textPlane.position.set(0, 6, 0.16);
      markerGroup.add(textPlane);

      // Support posts
      [-5, 5].forEach(x => {
        const postGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 16);
        const postMaterial = new THREE.MeshStandardMaterial({
          color: 0x555555,
          metalness: 0.7,
          roughness: 0.3
        });
        const post = new THREE.Mesh(postGeometry, postMaterial);
        post.position.set(x, 3, 0);
        post.castShadow = true;
        markerGroup.add(post);
      });

      // Spotlights on sign
      const spotlight1 = new THREE.SpotLight(color, 3, 20, Math.PI / 4, 0.5);
      spotlight1.position.set(-4, 9, 2);
      spotlight1.target.position.set(0, 6, 0);
      markerGroup.add(spotlight1);
      markerGroup.add(spotlight1.target);

      const spotlight2 = new THREE.SpotLight(color, 3, 20, Math.PI / 4, 0.5);
      spotlight2.position.set(4, 9, 2);
      spotlight2.target.position.set(0, 6, 0);
      markerGroup.add(spotlight2);
      markerGroup.add(spotlight2.target);

      // Position marker
      markerGroup.position.set(0, 0, zPosition);
      
      return markerGroup;
    }

    // Create "THE END" monument
    const endMonument = new THREE.Group();
    
    // Large pedestal
    const pedestalGeometry = new THREE.CylinderGeometry(8, 10, 2, 32);
    const pedestalMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4a574,
      roughness: 0.8,
      metalness: 0.2
    });
    const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    pedestal.position.y = 1;
    pedestal.castShadow = true;
    endMonument.add(pedestal);
    
    // Giant sign board
    const endSignGeometry = new THREE.BoxGeometry(16, 6, 0.5);
    const endSignMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.5,
      roughness: 0.5
    });
    const endSign = new THREE.Mesh(endSignGeometry, endSignMaterial);
    endSign.position.y = 8;
    endSign.castShadow = true;
    endMonument.add(endSign);
    
    // Golden border
    const endBorderGeometry = new THREE.BoxGeometry(16.5, 6.5, 0.4);
    const endBorderMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.7,
      metalness: 0.9,
      roughness: 0.1
    });
    const endBorder = new THREE.Mesh(endBorderGeometry, endBorderMaterial);
    endBorder.position.set(0, 8, -0.3);
    endMonument.add(endBorder);
    
    // Create "THE END" text
    const endCanvas = document.createElement('canvas');
    endCanvas.width = 2048;
    endCanvas.height = 768;
    const endContext = endCanvas.getContext('2d');
    
    // Fill background
    endContext.fillStyle = '#1a1a2e';
    endContext.fillRect(0, 0, endCanvas.width, endCanvas.height);
    
    // Draw "THE END"
    endContext.fillStyle = '#FFD700';
    endContext.font = 'bold 180px Arial';
    endContext.textAlign = 'center';
    endContext.textBaseline = 'middle';
    endContext.fillText('THE END', endCanvas.width / 2, endCanvas.height / 2 - 80);
    
    // Draw subtitle
    endContext.font = 'bold 80px Arial';
    endContext.fillStyle = '#00ffff';
    endContext.fillText('Thank You For Visiting!', endCanvas.width / 2, endCanvas.height / 2 + 80);
    
    // Draw stars
    for (let i = 0; i < 50; i++) {
      endContext.fillStyle = '#FFD700';
      const x = Math.random() * endCanvas.width;
      const y = Math.random() * endCanvas.height;
      const size = Math.random() * 3 + 1;
      endContext.fillRect(x, y, size, size);
    }
    
    // Create texture
    const endTexture = new THREE.CanvasTexture(endCanvas);
    const endTextMaterial = new THREE.MeshBasicMaterial({
      map: endTexture,
      transparent: true
    });
    
    // Apply to sign
    const endTextPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 6),
      endTextMaterial
    );
    endTextPlane.position.set(0, 8, 0.26);
    endMonument.add(endTextPlane);
    
    // Support pillars
    [-7, 7].forEach(x => {
      const pillarGeometry = new THREE.CylinderGeometry(0.5, 0.6, 10, 16);
      const pillarMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B7355,
        metalness: 0.3,
        roughness: 0.7
      });
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(x, 5, 0);
      pillar.castShadow = true;
      endMonument.add(pillar);
    });
    
    // Spotlights
    [0xFFD700, 0x00ffff, 0xFF1493, 0x00ff00].forEach((color, i) => {
      const spotlight = new THREE.SpotLight(color, 5, 30, Math.PI / 4, 0.5);
      const angle = (i * Math.PI / 2);
      spotlight.position.set(Math.cos(angle) * 8, 12, Math.sin(angle) * 8);
      spotlight.target.position.set(0, 8, 0);
      endMonument.add(spotlight);
      endMonument.add(spotlight.target);
    });
    
    // Position at end of road
    endMonument.position.set(0, 0, -180);
    scene.add(endMonument);

    // Desert sand particles (dust)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
      if (i % 3 === 1) posArray[i] = Math.random() * 5; // Y position (low to ground)
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0xe8d4b0, // Sandy dust color
      transparent: true,
      opacity: 0.3
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Keyboard controls
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Animation loop
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Update sky
      if (skyMaterial.uniforms) {
        skyMaterial.uniforms.time.value = elapsed;
      }

      // Car physics - Much smoother and slower
      if (carGroupRef.current) {
        const acceleration = 0.3;
        const maxSpeed = 0.5;
        const friction = 0.92;
        const turnSpeed = 0.02;
        const smoothFactor = 0.15; // For smooth interpolation

        // Smooth acceleration
        if (keysPressed.current['arrowup'] || keysPressed.current['w']) {
          const targetSpeed = -maxSpeed;
          carVelocity.current.z += (targetSpeed - carVelocity.current.z) * smoothFactor;
        } else if (keysPressed.current['arrowdown'] || keysPressed.current['s']) {
          const targetSpeed = maxSpeed * 0.5;
          carVelocity.current.z += (targetSpeed - carVelocity.current.z) * smoothFactor;
        } else {
          // Apply friction when no input
          carVelocity.current.z *= friction;
        }

        // Smooth turning - FIXED: corrected left/right direction
        if (keysPressed.current['arrowleft'] || keysPressed.current['a']) {
          if (Math.abs(carVelocity.current.z) > 0.05) {
            carRotation.current -= turnSpeed * Math.sign(carVelocity.current.z);
          }
        }
        if (keysPressed.current['arrowright'] || keysPressed.current['d']) {
          if (Math.abs(carVelocity.current.z) > 0.05) {
            carRotation.current += turnSpeed * Math.sign(carVelocity.current.z);
          }
        }

        // Clamp velocity
        carVelocity.current.z = Math.max(-maxSpeed, Math.min(maxSpeed * 0.5, carVelocity.current.z));

        // Smooth movement
        const moveX = Math.sin(carRotation.current) * carVelocity.current.z;
        const moveZ = Math.cos(carRotation.current) * carVelocity.current.z;
        
        carGroupRef.current.position.x += moveX;
        carGroupRef.current.position.z += moveZ;
        
        // Keep vehicle on the road - boundary constraints
        const roadBoundary = 4; // Keep within 4 units of center
        if (carGroupRef.current.position.x < -roadBoundary) {
          carGroupRef.current.position.x = -roadBoundary;
        }
        if (carGroupRef.current.position.x > roadBoundary) {
          carGroupRef.current.position.x = roadBoundary;
        }
        
        // Check if reached end of road (after last project)
        if (carGroupRef.current.position.z < -175 && !journeyCompleted) {
          setJourneyCompleted(true);
          // Stop the vehicle
          carVelocity.current.z = 0;
          carVelocity.current.x = 0;
        }
        
        // Smooth rotation
        carGroupRef.current.rotation.y += (carRotation.current - carGroupRef.current.rotation.y) * 0.2;

        // Rotate wheels smoothly
        wheelsRef.current.forEach(wheel => {
          wheel.rotation.x -= carVelocity.current.z * 3;
        });

        setSpeed(Math.abs(carVelocity.current.z * 100).toFixed(0));

        // Check proximity to buildings - Better detection from road
        let nearestProject = null;
        let minDistance = Infinity;

        projects.forEach(project => {
          const dx = carGroupRef.current.position.x - project.position.x;
          const dz = carGroupRef.current.position.z - project.position.z;
          const distance = Math.sqrt(dx * dx + dz * dz);

          // More generous detection range
          if (distance < 25 && distance < minDistance) {
            minDistance = distance;
            nearestProject = project;
          }
        });

        if (nearestProject) {
          setNearbyProject(nearestProject);
          // Check if car's Z position is near the project's Z position (driving past it)
          const carZ = carGroupRef.current.position.z;
          const projectZ = nearestProject.position.z;
          const zDistance = Math.abs(carZ - projectZ);
          
          // Show project when you're driving past it (based on Z distance)
          if (zDistance < 8) {
            setCurrentProject(nearestProject);
          }
        } else {
          setNearbyProject(null);
        }

        // Smooth camera follow - behind vehicle view
        const cameraDistance = 15;
        const cameraHeight = 8;
        
        const targetCameraX = carGroupRef.current.position.x;
        const targetCameraZ = carGroupRef.current.position.z + cameraDistance;
        const targetCameraY = cameraHeight;
        
        camera.position.x += (targetCameraX - camera.position.x) * 0.08;
        camera.position.z += (targetCameraZ - camera.position.z) * 0.08;
        camera.position.y += (targetCameraY - camera.position.y) * 0.08;
        
        // Look at vehicle
        const lookAtTarget = new THREE.Vector3(
          carGroupRef.current.position.x,
          carGroupRef.current.position.y + 1,
          carGroupRef.current.position.z - 5
        );
        camera.lookAt(lookAtTarget);
      }

      // Animate particles
      particlesMesh.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
    };

    animate();
    setTimeout(() => setShowProfile(true), 500);

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-orange-200 via-yellow-100 to-amber-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
          overflow: hidden;
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px currentColor; }
          50% { box-shadow: 0 0 40px currentColor; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-slide-in {
          animation: slideIn 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .glass {
          background: rgba(20, 20, 40, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(100, 200, 255, 0.2);
        }

        .neon-text {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
        }

        .cyber-border {
          position: relative;
          border: 2px solid currentColor;
          clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
        }

        .hover-lift {
          transition: transform 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
        }

        .gradient-text {
          background: linear-gradient(45deg, #00ffff, #0088ff, #ff00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* 3D Canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Project/Internship List - Left Side */}
        <div className="absolute left-6 top-32 animate-fade-in pointer-events-auto" style={{ maxWidth: '300px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <div className="glass cyber-border rounded-lg p-6" style={{ borderColor: '#00ffff' }}>
            <p className="text-sm text-cyan-400 font-bold mb-4 tracking-wider">ROADMAP</p>
            
            {/* Internships */}
            <div className="mb-6">
              <p className="text-xs text-purple-400 font-bold mb-3">💼 INTERNSHIPS</p>
              <div className="space-y-3">
                {projects.filter(p => p.buildingType === 'internship').map(project => (
                  <div 
                    key={project.id}
                    className={`text-xs p-3 rounded transition-all ${
                      currentProject?.id === project.id 
                        ? 'bg-white/20 border-l-2' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    style={{ 
                      borderColor: currentProject?.id === project.id ? project.color : 'transparent'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{project.icon}</span>
                      <span className="text-white font-semibold text-xs leading-tight">
                        {project.title}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{project.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <p className="text-xs text-green-400 font-bold mb-3">🚀 PROJECTS</p>
              <div className="space-y-3">
                {projects.filter(p => p.buildingType === 'project').map(project => (
                  <div 
                    key={project.id}
                    className={`text-xs p-3 rounded transition-all ${
                      currentProject?.id === project.id 
                        ? 'bg-white/20 border-l-2' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    style={{ 
                      borderColor: currentProject?.id === project.id ? project.color : 'transparent'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{project.icon}</span>
                      <span className="text-white font-semibold text-xs leading-tight">
                        {project.title}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{project.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Profile Card - Top Left - Only show when not moving */}
        {showProfile && speed === '0' && (
          <div className="absolute top-6 left-6 animate-slide-in pointer-events-auto">
            <div className="glass cyber-border rounded-lg p-8 max-w-sm" style={{ borderColor: '#00ffff' , padding:"20px" }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                  H
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white neon-text" style={{ color: '#00ffff' }}>
                    {profileData.name}
                  </h2>
                  <p className="text-cyan-300 font-semibold mt-2">{profileData.title}</p>
                  <p className="text-gray-400 text-sm mt-2">{profileData.location}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-cyan-400">📧</span>
                  <span className="font-mono text-xs">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-cyan-400">📱</span>
                  <span className="font-mono text-xs">{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-cyan-400">💻</span>
                  <span className="font-mono text-xs">{profileData.github}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-cyan-400">🔗</span>
                  <span className="font-mono text-xs">{profileData.linkedin}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-cyan-900">
                <p className="text-xs text-cyan-400 font-bold mb-3">CORE SKILLS</p>
                <div className="flex flex-wrap gap-2">
                  {['NestJS', 'React', 'ASP.NET', 'Symfony', 'TypeScript',"Java",".netCore","C#","Jetpack Compose"].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-cyan-900/30 border border-cyan-500/30 rounded text-xs text-cyan-300 font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <br/>

              <div className="mt-5 pt-5 border-t border-cyan-900">
                <p className="text-xs text-cyan-400 font-bold mb-3">EDUCATION</p>
                <div className="space-y-3 text-xs text-gray-300">
                  <div>
                    <p className="text-white font-semibold">THM - Mittelhessen, DE</p>
                    <p className="text-gray-400 mt-1">Engineering • Oct 2025 - Present</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold">ESPRIT, Tunisia</p>
                    <p className="text-gray-400 mt-1">Software Engineering • 2023-2025</p>
                  </div>
                   <div>
                    <p className="text-white font-semibold">University of Monastir, Tunisia</p>
                    <p className="text-gray-400 mt-1">Bachelor’s Degree in Software Engineering • 2020– 2023</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-cyan-900">
                <p className="text-xs text-cyan-400 font-bold mb-3">CERTIFICATIONS</p>
                <div className="space-y-2 text-xs text-gray-300">
                  <p>🎓 Udacity - Full Stack Developer</p>
                  <p>🌐 Cisco CCNA</p>
                  <p>🐧 Linux Essentials (LPI)</p>
                  <p>💻 HackerRank: Problem Solving</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Dashboard - Top Center */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 animate-fade-in pointer-events-auto" >
          <div className="glass cyber-border rounded-lg px-6 py-3 flex items-center gap-6" style={{ borderColor: '#00ff00',padding:"20px"}}>
            <div className="text-center">
              <p className="text-2xl font-black text-cyan-400 font-mono">4</p>
              <p className="text-xs text-gray-400">Internships</p>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <p className="text-2xl font-black text-purple-400 font-mono">3</p>
              <p className="text-xs text-gray-400">Projects</p>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <p className="text-2xl font-black text-green-400 font-mono">10+</p>
              <p className="text-xs text-gray-400">Technologies</p>
            </div>
          </div>
        </div>

        {/* Controls - Top Right */}
        <div className="absolute top-6 right-6 animate-fade-in pointer-events-auto">
          <div className="glass cyber-border rounded-lg p-6" style={{ borderColor: '#ff00ff' }}>
            <p className="text-sm text-purple-400 font-bold mb-4">VEHICLE CONTROLS</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div></div>
              <div className="bg-purple-900/30 border border-purple-500/30 rounded px-3 py-2 text-sm font-bold text-purple-300">
                ↑ W
              </div>
              <div></div>
              <div className="bg-purple-900/30 border border-purple-500/30 rounded px-3 py-2 text-sm font-bold text-purple-300">
                ← A
              </div>
              <div className="bg-purple-900/30 border border-purple-500/30 rounded px-3 py-2 text-sm font-bold text-purple-300">
                ↓ S
              </div>
              <div className="bg-purple-900/30 border border-purple-500/30 rounded px-3 py-2 text-sm font-bold text-purple-300">
                → D
              </div>
            </div>
          </div>
        </div>

        {/* Speedometer - Bottom Right */}
        <div className="absolute bottom-6 right-6 animate-fade-in pointer-events-auto">
          <div className="glass cyber-border rounded-lg p-8 text-center animate-glow" style={{ borderColor: '#00ff00' }}>
            <p className="text-sm text-green-400 font-bold mb-2">VELOCITY</p>
            <p className="text-5xl font-black text-white neon-text font-mono" style={{ color: '#00ff00' }}>
              {speed}
            </p>
            <p className="text-sm text-green-400 font-bold mt-2">KM/H</p>
            <div className="mt-4 w-36 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (speed / 120) * 100)}%` }}
              />
            </div>
          </div>
          
          {/* Reset Button */}
          <div className="mt-4">
            <button
              onClick={() => {
                if (carGroupRef.current) {
                  carGroupRef.current.position.set(0, 0, 10);
                  carGroupRef.current.rotation.y = 0;
                  carVelocity.current = { x: 0, z: 0 };
                  carRotation.current = 0;
                  setCurrentProject(null);
                  setNearbyProject(null);
                  setShowProfile(true);
                  setJourneyCompleted(false);
                }
              }}
              className="w-full glass cyber-border rounded-lg p-4 text-center transition-all hover:bg-white/10 hover:scale-105"
              style={{ borderColor: '#ff6b6b' }}
            >
              <p className="text-xs text-red-400 font-bold mb-1">🔄 RESTART</p>
              <p className="text-xs text-gray-400">Return to Start</p>
            </button>
          </div>
        </div>

        {/* Proximity Alert */}
        {nearbyProject && !currentProject && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float pointer-events-auto">
            <div className="glass cyber-border rounded-lg p-6 text-center" style={{ borderColor: nearbyProject.color }}>
              <div className="text-6xl mb-2">{nearbyProject.icon}</div>
              <p className="text-xl font-bold text-white neon-text" style={{ color: nearbyProject.color }}>
                {nearbyProject.title}
              </p>
              <p className="text-gray-400 mt-2">Keep driving forward</p>
              <div className="mt-3 text-3xl animate-bounce">↓</div>
            </div>
          </div>
        )}

        {/* Project Detail Modal - Compact Version */}
        {currentProject && (
          <div className="absolute bottom-6 left-6 animate-slide-in pointer-events-auto" style={{ maxWidth: '420px' }}>
            <div 
              className="glass cyber-border rounded-lg p-6"
              style={{ borderColor: currentProject.color }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{currentProject.icon}</div>
                <div className="flex-1">
                  <h2 
                    className="text-xl font-black text-white neon-text"
                    style={{ color: currentProject.color }}
                  >
                    {currentProject.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs mt-2">
                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white font-semibold" style={{padding:"10px"}}>
                      {currentProject.type}
                    </span>
                    <span className="text-gray-400 font-mono">{currentProject.period}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentProject(null)}
                  className="text-white/60 hover:text-white text-xl font-bold transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {currentProject.description}
              </p>

              <div className="mb-4">
                <p className="text-xs font-bold text-gray-400 mb-2">KEY ACHIEVEMENTS</p>
                <div className="space-y-2">
                  {currentProject.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <span style={{ color: currentProject.color }}>▸</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-bold text-gray-400 mb-2">TECH STACK</p>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tech.map(tech => (
                    <span 
                      key={tech}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: `${currentProject.color}20`,
                        border: `1px solid ${currentProject.color}50`,
                        color: currentProject.color
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {currentProject.buildingType === 'project' && currentProject.githubUrl ? (
                  <>
                    {/* Special case for RadioHub with two versions */}
                    {currentProject.githubUrlJava ? (
                      <>
                        <button 
                          onClick={() => window.open(currentProject.githubUrl, '_blank')}
                          className="flex-1 py-2 rounded-lg font-bold text-white text-sm transition-all hover-lift flex items-center justify-center gap-1"
                          style={{ backgroundColor: currentProject.color }}
                        >
                          <span>Symfony</span>
                          <span>→</span>
                        </button>
                        <button 
                          onClick={() => window.open(currentProject.githubUrlJava, '_blank')}
                          className="flex-1 py-2 rounded-lg font-bold text-white text-sm border-2 transition-all hover-lift flex items-center justify-center gap-1"
                          style={{ borderColor: currentProject.color, color: currentProject.color }}
                        >
                          <span>JavaFX</span>
                          <span>→</span>
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => window.open(currentProject.githubUrl, '_blank')}
                        className="flex-1 py-2 rounded-lg font-bold text-white text-sm transition-all hover-lift flex items-center justify-center gap-2"
                        style={{ backgroundColor: currentProject.color }}
                      >
                        <span>View Code</span>
                        <span>→</span>
                      </button>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Journey Completed Celebration */}
        {journeyCompleted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in pointer-events-auto z-50">
            <div className="glass cyber-border rounded-2xl p-12 max-w-2xl text-center" style={{ borderColor: '#FFD700' }}>
              <div className="text-8xl mb-6 animate-bounce">🎉</div>
              <h2 className="text-6xl font-black text-white neon-text mb-4 gradient-text">
                JOURNEY COMPLETE!
              </h2>
              <p className="text-2xl text-cyan-300 mb-6 font-semibold">
                Thank you for exploring my portfolio
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8 text-center">
                <div className="glass rounded-lg p-4" style={{ borderColor: '#9b59b6' }}>
                  <p className="text-4xl font-black text-purple-400 mb-2">4</p>
                  <p className="text-sm text-gray-300">Internships Completed</p>
                </div>
                <div className="glass rounded-lg p-4" style={{ borderColor: '#27ae60' }}>
                  <p className="text-4xl font-black text-green-400 mb-2">3</p>
                  <p className="text-sm text-gray-300">Projects Built</p>
                </div>
                <div className="glass rounded-lg p-4" style={{ borderColor: '#FFD700' }}>
                  <p className="text-4xl font-black text-yellow-400 mb-2">10+</p>
                  <p className="text-sm text-gray-300">Technologies Mastered</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-gray-300 text-lg">📧 {profileData.email}</p>
                <p className="text-gray-300 text-lg">📱 {profileData.phone}</p>
                <p className="text-cyan-400 text-lg">💻 {profileData.github}</p>
                <p className="text-cyan-400 text-lg">🔗 {profileData.linkedin}</p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    if (carGroupRef.current) {
                      carGroupRef.current.position.set(0, 0, 10);
                      carGroupRef.current.rotation.y = 0;
                      carVelocity.current = { x: 0, z: 0 };
                      carRotation.current = 0;
                      setCurrentProject(null);
                      setNearbyProject(null);
                      setShowProfile(true);
                      setJourneyCompleted(false);
                    }
                  }}
                  className="px-8 py-4 rounded-lg font-bold text-white text-lg transition-all hover:scale-105"
                  style={{ backgroundColor: '#00ff00' }}
                >
                  🔄 Restart Journey
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 rounded-lg font-bold text-white text-lg border-2 transition-all hover:scale-105"
                  style={{ borderColor: '#00ffff' }}
                >
                  ↻ Reload Page
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-400">
                <p>Built with React + Three.js • Desert Theme</p>
                <p className="mt-2">Press 🔄 Restart to explore again!</p>
              </div>
            </div>
          </div>
        )}

        {/* Start Prompt */}
        {showProfile && speed === '0' && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float pointer-events-auto">
            <div className="glass cyber-border rounded-lg p-8 text-center" style={{ borderColor: '#00ffff',padding:"20px" }}>
              <div className="text-7xl mb-4 animate-bounce">🏁</div>
              <h3 className="text-4xl font-black text-white neon-text mb-2 gradient-text">
                READY TO EXPLORE?
              </h3>
              <p className="text-gray-300 text-lg mb-4">
                Drive through the desert and discover my projects
              </p>
              <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold">
                <span className="text-2xl">↑</span>
                <span>Press W or Arrow Up to start driving</span>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
