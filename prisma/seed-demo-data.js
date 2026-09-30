const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

async function seedDemoData() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL is not set.');
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('Seeding rich demo courses, curriculum, live classes, enrollments...');

  const student = await prisma.user.findUnique({
    where: { email: 'student@eduna.com' }
  });

  if (!student) {
    console.error('Student user not found, please run npm run seed first.');
    process.exit(1);
  }

  // 1. Courses
  const coursesData = [
    {
      title: 'Full-Stack Next.js & React 19 Masterclass',
      slug: 'full-stack-nextjs-react-19-masterclass',
      category: 'Web Development',
      description: 'Master full-stack web development with Next.js 16, React 19 Server Components, Prisma ORM, Server Actions, and Tailwind CSS. Build production-ready, performant web applications with authentication, payment gateways, and real-time features.',
      level: 'INTERMEDIATE',
      price: 49.99,
      duration: '32 Hours',
      thumbnail: '/assets/images/course/course-1/1.png',
      isPublished: true,
      chapters: [
        {
          title: 'Foundations of Modern React & Next.js',
          sortOrder: 1,
          lessons: [
            { title: 'Welcome & Architecture Overview', duration: '15 mins', isFreePreview: true, sortOrder: 1, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            { title: 'Server Components vs Client Components', duration: '28 mins', isFreePreview: true, sortOrder: 2, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            { title: 'File-system Routing & Dynamic Segments', duration: '35 mins', isFreePreview: false, sortOrder: 3 }
          ]
        },
        {
          title: 'Database Architecture with PostgreSQL & Prisma',
          sortOrder: 2,
          lessons: [
            { title: 'Schema Design & Relational Modeling', duration: '40 mins', isFreePreview: false, sortOrder: 1 },
            { title: 'Connecting Next.js with Prisma Pg Adapter', duration: '25 mins', isFreePreview: false, sortOrder: 2 },
            { title: 'Optimistic Updates & Server Actions', duration: '45 mins', isFreePreview: false, sortOrder: 3 }
          ]
        },
        {
          title: 'Authentication, Security & Payments',
          sortOrder: 3,
          lessons: [
            { title: 'NextAuth.js v4 JWT Authentication & Role Guards', duration: '50 mins', isFreePreview: false, sortOrder: 1 },
            { title: 'Razorpay Checkout & Webhook Validation', duration: '42 mins', isFreePreview: false, sortOrder: 2 },
            { title: 'Production Deployment & Dockerization', duration: '30 mins', isFreePreview: false, sortOrder: 3 }
          ]
        }
      ]
    },
    {
      title: 'Python for Artificial Intelligence & Machine Learning',
      slug: 'python-for-ai-and-machine-learning',
      category: 'Data Science',
      description: 'Hands-on journey into Machine Learning, Deep Learning, and Generative AI using Python, PyTorch, Scikit-Learn, and Hugging Face. Develop end-to-end predictive pipelines and deploy AI models as scalable REST APIs.',
      level: 'BEGINNER',
      price: 59.99,
      duration: '45 Hours',
      thumbnail: '/assets/images/course/course-1/2.png',
      isPublished: true,
      chapters: [
        {
          title: 'Python Data Science Stack',
          sortOrder: 1,
          lessons: [
            { title: 'NumPy Vectorization & Performance', duration: '30 mins', isFreePreview: true, sortOrder: 1 },
            { title: 'Pandas Data Cleaning & Feature Engineering', duration: '45 mins', isFreePreview: true, sortOrder: 2 },
            { title: 'Exploratory Data Analysis with Seaborn', duration: '35 mins', isFreePreview: false, sortOrder: 3 }
          ]
        },
        {
          title: 'Supervised & Unsupervised Learning',
          sortOrder: 2,
          lessons: [
            { title: 'Regression & Classification Workflows', duration: '50 mins', isFreePreview: false, sortOrder: 1 },
            { title: 'Model Evaluation, ROC-AUC & Cross-Validation', duration: '40 mins', isFreePreview: false, sortOrder: 2 }
          ]
        }
      ]
    },
    {
      title: 'Complete UI/UX Design with Figma & Design Systems',
      slug: 'complete-ui-ux-design-with-figma',
      category: 'UI/UX Design',
      description: 'Learn user research, wireframing, high-fidelity prototyping, micro-interactions, and building scalable component design systems in Figma for web and mobile.',
      level: 'BEGINNER',
      price: 39.99,
      duration: '24 Hours',
      thumbnail: '/assets/images/course/course-1/3.png',
      isPublished: true,
      chapters: [
        {
          title: 'User Experience Principles',
          sortOrder: 1,
          lessons: [
            { title: 'Design Thinking & User Persona Mapping', duration: '25 mins', isFreePreview: true, sortOrder: 1 },
            { title: 'Information Architecture & User Flows', duration: '30 mins', isFreePreview: false, sortOrder: 2 }
          ]
        },
        {
          title: 'Mastering Figma Components & Auto Layout',
          sortOrder: 2,
          lessons: [
            { title: 'Auto Layout 5.0 Deep Dive', duration: '45 mins', isFreePreview: true, sortOrder: 1 },
            { title: 'Design Tokens & Interactive Variants', duration: '50 mins', isFreePreview: false, sortOrder: 2 }
          ]
        }
      ]
    },
    {
      title: 'Cloud Architecture & DevOps with AWS & Docker',
      slug: 'cloud-architecture-devops-aws-docker',
      category: 'Cloud Computing',
      description: 'Architect resilient multi-region cloud infrastructures on AWS using Terraform, Docker containerization, Kubernetes orchestration, and GitHub Actions CI/CD pipelines.',
      level: 'ADVANCED',
      price: 79.99,
      duration: '38 Hours',
      thumbnail: '/assets/images/course/course-1/4.png',
      isPublished: true,
      chapters: [
        {
          title: 'Containerization & Docker Fundamentals',
          sortOrder: 1,
          lessons: [
            { title: 'Multi-stage Dockerfile Optimization', duration: '35 mins', isFreePreview: true, sortOrder: 1 },
            { title: 'Docker Compose for Microservices', duration: '40 mins', isFreePreview: false, sortOrder: 2 }
          ]
        },
        {
          title: 'AWS Cloud Infrastructure',
          sortOrder: 2,
          lessons: [
            { title: 'VPC, Subnets, Internet Gateways & Security Groups', duration: '55 mins', isFreePreview: false, sortOrder: 1 },
            { title: 'CI/CD Automation with GitHub Actions & AWS ECS', duration: '60 mins', isFreePreview: false, sortOrder: 2 }
          ]
        }
      ]
    },
    {
      title: 'Cybersecurity Fundamentals & Network Defense',
      slug: 'cybersecurity-fundamentals-network-defense',
      category: 'Cyber Security',
      description: 'Understand modern threat landscapes, penetration testing methodology, network defense, cryptographic primitives, and secure web application hardening.',
      level: 'INTERMEDIATE',
      price: 69.99,
      duration: '28 Hours',
      thumbnail: '/assets/images/course/course-1/5.png',
      isPublished: true,
      chapters: [
        {
          title: 'Security Foundations & Cryptography',
          sortOrder: 1,
          lessons: [
            { title: 'Threat Modeling & OWASP Top 10', duration: '30 mins', isFreePreview: true, sortOrder: 1 },
            { title: 'Symmetric & Asymmetric Encryption', duration: '45 mins', isFreePreview: false, sortOrder: 2 }
          ]
        }
      ]
    },
    {
      title: 'Cross-Platform Mobile Apps with React Native',
      slug: 'cross-platform-mobile-apps-react-native',
      category: 'Mobile Development',
      description: 'Build native iOS and Android applications with a single codebase using React Native, Expo, React Navigation, Redux Toolkit, and native device capabilities.',
      level: 'INTERMEDIATE',
      price: 54.99,
      duration: '30 Hours',
      thumbnail: '/assets/images/course/course-1/6.png',
      isPublished: true,
      chapters: [
        {
          title: 'React Native & Expo Ecosystem',
          sortOrder: 1,
          lessons: [
            { title: 'Expo Router & Declarative Navigation', duration: '35 mins', isFreePreview: true, sortOrder: 1 },
            { title: 'Native Device Sensors & Camera Integration', duration: '40 mins', isFreePreview: false, sortOrder: 2 }
          ]
        }
      ]
    }
  ];

  const createdCourses = [];
  for (const c of coursesData) {
    const existing = await prisma.course.findUnique({ where: { slug: c.slug } });
    if (!existing) {
      const course = await prisma.course.create({
        data: {
          title: c.title,
          slug: c.slug,
          category: c.category,
          description: c.description,
          level: c.level,
          price: c.price,
          duration: c.duration,
          thumbnail: c.thumbnail,
          isPublished: c.isPublished,
          chapters: {
            create: c.chapters.map(ch => ({
              title: ch.title,
              sortOrder: ch.sortOrder,
              lessons: {
                create: ch.lessons.map(l => ({
                  title: l.title,
                  duration: l.duration,
                  isFreePreview: l.isFreePreview || false,
                  sortOrder: l.sortOrder,
                  videoUrl: l.videoUrl || null,
                }))
              }
            }))
          }
        },
        include: {
          chapters: {
            include: { lessons: true }
          }
        }
      });
      createdCourses.push(course);
      console.log('Created course:', course.title);
    } else {
      const fullCourse = await prisma.course.findUnique({
        where: { id: existing.id },
        include: { chapters: { include: { lessons: true } } }
      });
      createdCourses.push(fullCourse);
      console.log('Course already exists:', existing.title);
    }
  }

  // 2. Enroll student into first 3 courses
  for (let i = 0; i < Math.min(3, createdCourses.length); i++) {
    const course = createdCourses[i];
    await prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: student.id,
          courseId: course.id
        }
      },
      update: {},
      create: {
        userId: student.id,
        courseId: course.id
      }
    });

    // Mark lessons as completed for progress demonstration
    if (i === 0) {
      // 60% progress
      const lessons = course.chapters.flatMap(ch => ch.lessons);
      const half = Math.floor(lessons.length * 0.6);
      for (let j = 0; j < half; j++) {
        await prisma.lessonProgress.upsert({
          where: {
            userId_lessonId: { userId: student.id, lessonId: lessons[j].id }
          },
          update: { isCompleted: true },
          create: { userId: student.id, lessonId: lessons[j].id, isCompleted: true }
        });
      }
    } else if (i === 1) {
      // 100% completed
      const lessons = course.chapters.flatMap(ch => ch.lessons);
      for (const les of lessons) {
        await prisma.lessonProgress.upsert({
          where: {
            userId_lessonId: { userId: student.id, lessonId: les.id }
          },
          update: { isCompleted: true },
          create: { userId: student.id, lessonId: les.id, isCompleted: true }
        });
      }
    }
  }

  // 3. Live Classes
  const futureDate1 = new Date();
  futureDate1.setDate(futureDate1.getDate() + 1);
  futureDate1.setHours(18, 0, 0, 0);

  const futureDate2 = new Date();
  futureDate2.setDate(futureDate2.getDate() + 3);
  futureDate2.setHours(20, 0, 0, 0);

  const liveClassesData = [
    {
      title: 'Full-Stack Architecture & Microservices Q&A',
      description: 'Interactive session exploring modular architectures, API gateways, database sharding, and real-time streaming pipelines.',
      scheduledAt: futureDate1,
      duration: 90,
      meetLink: 'https://meet.google.com/eduna-arch-live',
      isActive: true,
      courses: {
        connect: [{ id: createdCourses[0].id }]
      }
    },
    {
      title: 'Live UI/UX Portfolio & Figma System Review',
      description: 'Bring your design portfolios for live critiquing, accessibility scoring, and design token optimization.',
      scheduledAt: futureDate2,
      duration: 60,
      meetLink: 'https://meet.google.com/eduna-design-critique',
      isActive: true,
      courses: {
        connect: [{ id: createdCourses[2].id }]
      }
    }
  ];

  for (const lc of liveClassesData) {
    const existing = await prisma.liveClass.findFirst({ where: { title: lc.title } });
    if (!existing) {
      await prisma.liveClass.create({ data: lc });
      console.log('Created live class:', lc.title);
    }
  }

  // 4. Coupons
  const coupons = [
    { code: 'EDUNA50', discount: 50, maxUses: 200, usedCount: 14, isActive: true },
    { code: 'WELCOME20', discount: 20, maxUses: 500, usedCount: 68, isActive: true },
    { code: 'FUTUREDEV', discount: 30, maxUses: 100, usedCount: 5, isActive: true },
  ];

  for (const cp of coupons) {
    await prisma.coupon.upsert({
      where: { code: cp.code },
      update: {},
      create: cp
    });
    console.log('Seeded coupon:', cp.code);
  }

  console.log('Demo seed completed successfully!');
  await prisma.$disconnect();
  await pool.end();
}

seedDemoData().catch(e => {
  console.error(e);
  process.exit(1);
});
