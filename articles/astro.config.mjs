// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://codingskuy.github.io",
  base: "/articles",
  trailingSlash: "always",
  outDir: "./dist",
  integrations: [
    starlight({
      title: "CodingSkuy",
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/roiskhoiron" }],
      customCss: ["./src/styles/theme.css"],
      sidebar: [
        {
          label: "🌱 Foundation",
          items: [
            {
              label: "Apa Itu Software Engineering",
              items: [
                { label: "Apa itu Pemrograman", link: "/foundation/apa-itu-software-engineering/apa-itu-pemrograman/" },
                { label: "Software Developer vs Software Engineer", link: "/foundation/apa-itu-software-engineering/software-developer-vs-engineer/" },
                { label: "Cara Belajar Coding", link: "/foundation/apa-itu-software-engineering/cara-belajar-coding/" },
                { label: "Growth Mindset untuk Engineer", link: "/foundation/apa-itu-software-engineering/growth-mindset-engineer/" }
              ]
            },
            {
              label: "Roadmap",
              items: [
                { label: "Roadmap Developer", link: "/foundation/roadmap/roadmap-developer/" },
                { label: "Roadmap Mobile Engineer", link: "/foundation/roadmap/roadmap-mobile-engineer/" },
                { label: "Roadmap Backend Engineer", link: "/foundation/roadmap/roadmap-backend-engineer/" },
                { label: "Roadmap AI Engineer", link: "/foundation/roadmap/roadmap-ai-engineer/" },
                { label: "Roadmap Technical Lead", link: "/foundation/roadmap/roadmap-technical-lead/" }
              ]
            },
            {
              label: "Professional Mindset",
              items: [
                { label: "Berpikir Sistem", link: "/foundation/professional-mindset/berpikir-sistem/" },
                { label: "Root Cause Analysis", link: "/foundation/professional-mindset/root-cause-analysis/" },
                { label: "Technical Debt", link: "/foundation/professional-mindset/technical-debt/" },
                { label: "Cost vs Benefit Thinking", link: "/foundation/professional-mindset/cost-vs-benefit/" },
                { label: "Risk Management Dasar", link: "/foundation/professional-mindset/risk-management/" }
              ]
            }
          ]
        },
        {
          label: "🏗️ Software Engineering",
          items: [
            {
              label: "Architecture",
              items: [
                {
                  label: "Clean Architecture",
                  items: [
                    { label: "Layered Architecture", link: "/software-engineering/clean-architecture/layered-architecture/" },
                    { label: "Dependency Rule", link: "/software-engineering/clean-architecture/dependency-rule/" },
                    { label: "Use Case Pattern", link: "/software-engineering/clean-architecture/use-case-pattern/" }
                  ]
                },
                {
                  label: "Feature Architecture",
                  items: [
                    { label: "Feature First", link: "/software-engineering/feature-architecture/feature-first/" },
                    { label: "Layer First", link: "/software-engineering/feature-architecture/layer-first/" },
                    { label: "Modular Architecture", link: "/software-engineering/feature-architecture/modular-architecture/" }
                  ]
                },
                {
                  label: "Design Pattern",
                  items: [
                    { label: "Repository Pattern", link: "/software-engineering/design-pattern/repository-pattern/" },
                    { label: "Factory Pattern", link: "/software-engineering/design-pattern/factory-pattern/" },
                    { label: "Strategy Pattern", link: "/software-engineering/design-pattern/strategy-pattern/" },
                    { label: "Adapter Pattern", link: "/software-engineering/design-pattern/adapter-pattern/" }
                  ]
                }
              ]
            },
            {
              label: "Backend Engineering",
              items: [
                {
                  label: "API Design",
                  items: [
                    { label: "REST API", link: "/software-engineering/backend/rest-api/" },
                    { label: "GraphQL", link: "/software-engineering/backend/graphql/" },
                    { label: "Versioning", link: "/software-engineering/backend/api-versioning/" },
                    { label: "Pagination", link: "/software-engineering/backend/pagination/" }
                  ]
                },
                {
                  label: "Authentication",
                  items: [
                    { label: "JWT", link: "/software-engineering/backend/jwt/" },
                    { label: "OAuth2", link: "/software-engineering/backend/oauth2/" },
                    { label: "Session Management", link: "/software-engineering/backend/session-management/" }
                  ]
                },
                {
                  label: "Database",
                  items: [
                    { label: "SQL", link: "/software-engineering/backend/sql/" },
                    { label: "NoSQL", link: "/software-engineering/backend/nosql/" },
                    { label: "Data Modeling", link: "/software-engineering/backend/data-modeling/" }
                  ]
                },
                {
                  label: "Realtime System",
                  items: [
                    { label: "WebSocket", link: "/software-engineering/backend/websocket/" },
                    { label: "Event Driven Architecture", link: "/software-engineering/backend/event-driven/" }
                  ]
                },
                {
                  label: "Scalability",
                  items: [
                    { label: "Caching", link: "/software-engineering/backend/caching/" },
                    { label: "Load Balancing", link: "/software-engineering/backend/load-balancing/" },
                    { label: "Queue System", link: "/software-engineering/backend/queue-system/" }
                  ]
                }
              ]
            },
            {
              label: "Mobile Engineering",
              items: [
                {
                  label: "Flutter Fundamentals",
                  items: [
                    {
                      label: "Dart Language",
                      items: [
                        { label: "Variables & Data Types", link: "/software-engineering/mobile/flutter-fundamentals/dart-variables-data-types/" },
                        { label: "Functions", link: "/software-engineering/mobile/flutter-fundamentals/dart-functions/" },
                        { label: "OOP", link: "/software-engineering/mobile/flutter-fundamentals/dart-oop/" },
                        { label: "Null Safety", link: "/software-engineering/mobile/flutter-fundamentals/dart-null-safety/" },
                        { label: "Error Handling", link: "/software-engineering/mobile/flutter-fundamentals/dart-error-handling/" }
                      ]
                    },
                    {
                      label: "UI Development",
                      items: [
                        { label: "Widget", link: "/software-engineering/mobile/flutter-fundamentals/widget/" },
                        { label: "Layout", link: "/software-engineering/mobile/flutter-fundamentals/layout/" },
                        { label: "Responsive Design", link: "/software-engineering/mobile/flutter-fundamentals/responsive-design/" },
                        { label: "Theme Management", link: "/software-engineering/mobile/flutter-fundamentals/theme-management/" },
                        { label: "Accessibility", link: "/software-engineering/mobile/flutter-fundamentals/accessibility/" }
                      ]
                    },
                    {
                      label: "Navigation",
                      items: [
                        { label: "Navigator", link: "/software-engineering/mobile/flutter-fundamentals/navigator/" },
                        { label: "Named Route", link: "/software-engineering/mobile/flutter-fundamentals/named-route/" },
                        { label: "Deep Linking", link: "/software-engineering/mobile/flutter-fundamentals/deep-linking/" },
                        { label: "Route Management", link: "/software-engineering/mobile/flutter-fundamentals/route-management/" }
                      ]
                    },
                    {
                      label: "State Management",
                      items: [
                        { label: "setState", link: "/software-engineering/mobile/flutter-fundamentals/setstate/" },
                        { label: "Provider", link: "/software-engineering/mobile/flutter-fundamentals/provider/" },
                        { label: "Riverpod", link: "/software-engineering/mobile/flutter-fundamentals/riverpod/" },
                        { label: "State Architecture", link: "/software-engineering/mobile/flutter-fundamentals/state-architecture/" }
                      ]
                    },
                    {
                      label: "Local Storage",
                      items: [
                        { label: "Shared Preferences", link: "/software-engineering/mobile/flutter-fundamentals/shared-preferences/" },
                        { label: "Hive", link: "/software-engineering/mobile/flutter-fundamentals/hive/" },
                        { label: "SQLite", link: "/software-engineering/mobile/flutter-fundamentals/sqlite/" }
                      ]
                    },
                    {
                      label: "Networking",
                      items: [
                        { label: "HTTP", link: "/software-engineering/mobile/flutter-fundamentals/http/" },
                        { label: "Dio", link: "/software-engineering/mobile/flutter-fundamentals/dio/" },
                        { label: "REST API", link: "/software-engineering/mobile/flutter-fundamentals/networking-rest-api/" },
                        { label: "API Error Handling", link: "/software-engineering/mobile/flutter-fundamentals/api-error-handling/" }
                      ]
                    },
                    {
                      label: "Firebase",
                      items: [
                        { label: "Authentication", link: "/software-engineering/mobile/flutter-fundamentals/firebase-auth/" },
                        { label: "Firestore", link: "/software-engineering/mobile/flutter-fundamentals/firestore/" },
                        { label: "Push Notification", link: "/software-engineering/mobile/flutter-fundamentals/push-notification/" },
                        { label: "Analytics", link: "/software-engineering/mobile/flutter-fundamentals/firebase-analytics/" },
                        { label: "Crashlytics", link: "/software-engineering/mobile/flutter-fundamentals/crashlytics/" }
                      ]
                    },
                    {
                      label: "Testing",
                      items: [
                        { label: "Unit Test", link: "/software-engineering/mobile/flutter-fundamentals/unit-test/" },
                        { label: "Widget Test", link: "/software-engineering/mobile/flutter-fundamentals/widget-test/" },
                        { label: "Integration Test", link: "/software-engineering/mobile/flutter-fundamentals/integration-test/" }
                      ]
                    },
                    {
                      label: "Deployment",
                      items: [
                        { label: "APK & AAB", link: "/software-engineering/mobile/flutter-fundamentals/apk-aab/" },
                        { label: "App Signing", link: "/software-engineering/mobile/flutter-fundamentals/app-signing/" },
                        { label: "Play Store Release", link: "/software-engineering/mobile/flutter-fundamentals/play-store-release/" },
                        { label: "Release Strategy", link: "/software-engineering/mobile/flutter-fundamentals/release-strategy/" }
                      ]
                    },
                    {
                      label: "Native Integration",
                      items: [
                        { label: "Platform Channel", link: "/software-engineering/mobile/flutter-fundamentals/platform-channel/" },
                        { label: "Native SDK Integration", link: "/software-engineering/mobile/flutter-fundamentals/native-sdk/" },
                        { label: "Performance Optimization", link: "/software-engineering/mobile/flutter-fundamentals/performance-optimization/" }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              label: "Quality Engineering",
              items: [
                {
                  label: "Testing Strategy",
                  items: [
                    { label: "Unit Testing", link: "/software-engineering/quality/unit-testing/" },
                    { label: "Integration Testing", link: "/software-engineering/quality/integration-testing/" },
                    { label: "End-to-End Testing", link: "/software-engineering/quality/e2e-testing/" }
                  ]
                },
                {
                  label: "Observability",
                  items: [
                    { label: "Logging", link: "/software-engineering/quality/logging/" },
                    { label: "Monitoring", link: "/software-engineering/quality/monitoring/" },
                    { label: "Tracing", link: "/software-engineering/quality/tracing/" }
                  ]
                },
                {
                  label: "Reliability",
                  items: [
                    { label: "Error Handling", link: "/software-engineering/quality/reliability-error-handling/" },
                    { label: "Circuit Breaker", link: "/software-engineering/quality/circuit-breaker/" },
                    { label: "Retry Strategy", link: "/software-engineering/quality/retry-strategy/" }
                  ]
                }
              ]
            },
            {
              label: "DevOps & Delivery",
              items: [
                {
                  label: "CI/CD",
                  items: [
                    { label: "GitHub Actions", link: "/software-engineering/devops/github-actions/" },
                    { label: "Fastlane", link: "/software-engineering/devops/fastlane/" },
                    { label: "Deployment Pipeline", link: "/software-engineering/devops/deployment-pipeline/" }
                  ]
                },
                {
                  label: "Infrastructure",
                  items: [
                    { label: "Docker", link: "/software-engineering/devops/docker/" },
                    { label: "Container Basics", link: "/software-engineering/devops/container-basics/" },
                    { label: "Cloud Fundamentals", link: "/software-engineering/devops/cloud-fundamentals/" }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "🤖 AI Engineering",
          items: [
            {
              label: "AI Foundations",
              items: [
                {
                  label: "Machine Learning Basics",
                  items: [
                    { label: "Supervised Learning", link: "/ai/machine-learning/supervised-learning/" },
                    { label: "Unsupervised Learning", link: "/ai/machine-learning/unsupervised-learning/" }
                  ]
                },
                {
                  label: "Generative AI",
                  items: [
                    { label: "LLM Fundamentals", link: "/ai/generative-ai/llm-fundamentals/" },
                    { label: "Embedding", link: "/ai/generative-ai/embedding/" },
                    { label: "Vector Database", link: "/ai/generative-ai/vector-database/" }
                  ]
                }
              ]
            },
            {
              label: "AI Applications",
              items: [
                {
                  label: "Prompt Engineering",
                  items: [
                    { label: "Prompt Design", link: "/ai/prompt/prompt-design/" },
                    { label: "Evaluation", link: "/ai/prompt/evaluation/" },
                    { label: "Guardrails", link: "/ai/prompt/guardrails/" }
                  ]
                },
                {
                  label: "RAG",
                  items: [
                    { label: "Retrieval", link: "/ai/rag/retrieval/" },
                    { label: "Chunking", link: "/ai/rag/chunking/" },
                    { label: "Embedding Strategy", link: "/ai/rag/embedding-strategy/" }
                  ]
                },
                {
                  label: "MCP",
                  items: [
                    { label: "MCP Concepts", link: "/ai/mcp/mcp-concepts/" },
                    { label: "MCP Server", link: "/ai/mcp/mcp-server/" },
                    { label: "MCP Client", link: "/ai/mcp/mcp-client/" }
                  ]
                },
                {
                  label: "AI Agent",
                  items: [
                    { label: "Agent Fundamentals", link: "/ai/agent/agent-fundamentals/" },
                    { label: "Agent Workflow", link: "/ai/agent/agent-workflow/" },
                    { label: "Tool Calling", link: "/ai/agent/tool-calling/" },
                    { label: "Memory Management", link: "/ai/agent/memory-management/" }
                  ]
                },
                {
                  label: "Multi-Agent Systems",
                  items: [
                    { label: "Agent Collaboration", link: "/ai/multi-agent/collaboration/" },
                    { label: "Delegation", link: "/ai/multi-agent/delegation/" },
                    { label: "Coordination", link: "/ai/multi-agent/coordination/" }
                  ]
                },
                {
                  label: "Local AI",
                  items: [
                    { label: "Ollama", link: "/ai/local-ai/ollama/" },
                    { label: "MLX", link: "/ai/local-ai/mlx/" },
                    { label: "Local LLM", link: "/ai/local-ai/local-llm/" }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "🧠 Engineering Decisions",
          items: [
            {
              label: "Mobile Decisions",
              items: [
                {
                  label: "State Management Decisions",
                  items: [
                    { label: "Kapan setState Sudah Cukup?", link: "/decisions/mobile/kapan-setstate-cukup/" },
                    { label: "Provider vs Riverpod", link: "/decisions/mobile/provider-vs-riverpod/" },
                    { label: "Bloc vs Riverpod", link: "/decisions/mobile/bloc-vs-riverpod/" }
                  ]
                },
                {
                  label: "Architecture Decisions",
                  items: [
                    { label: "Kapan Clean Architecture Dibutuhkan?", link: "/decisions/mobile/kapan-clean-architecture/" },
                    { label: "Monolith vs Modular", link: "/decisions/mobile/monolith-vs-modular/" },
                    { label: "Feature First vs Layer First", link: "/decisions/mobile/feature-first-vs-layer-first/" }
                  ]
                },
                {
                  label: "Storage Decisions",
                  items: [
                    { label: "SharedPreferences vs Hive", link: "/decisions/mobile/sharedpref-vs-hive/" },
                    { label: "Hive vs SQLite", link: "/decisions/mobile/hive-vs-sqlite/" }
                  ]
                },
                {
                  label: "Backend Decisions",
                  items: [
                    { label: "Firebase vs Custom Backend", link: "/decisions/mobile/firebase-vs-custom/" },
                    { label: "REST vs GraphQL", link: "/decisions/mobile/rest-vs-graphql/" }
                  ]
                },
                {
                  label: "Performance Decisions",
                  items: [
                    { label: "Lazy Loading vs Prefetching", link: "/decisions/mobile/lazy-vs-prefetch/" },
                    { label: "Caching Strategy", link: "/decisions/mobile/caching-strategy/" }
                  ]
                }
              ]
            },
            {
              label: "AI Decisions",
              items: [
                {
                  label: "Model Decisions",
                  items: [
                    { label: "Cloud LLM vs Local LLM", link: "/decisions/ai/cloud-vs-local-llm/" },
                    { label: "Open Source vs Closed Source", link: "/decisions/ai/open-vs-closed-source/" }
                  ]
                },
                {
                  label: "Knowledge Decisions",
                  items: [
                    { label: "RAG vs Fine Tuning", link: "/decisions/ai/rag-vs-finetuning/" },
                    { label: "Vector Database vs Traditional Search", link: "/decisions/ai/vector-vs-search/" }
                  ]
                },
                {
                  label: "Agent Decisions",
                  items: [
                    { label: "Single Agent vs Multi Agent", link: "/decisions/ai/single-vs-multi-agent/" },
                    { label: "MCP vs REST API", link: "/decisions/ai/mcp-vs-rest/" }
                  ]
                },
                {
                  label: "Deployment Decisions",
                  items: [
                    { label: "Self Hosted vs SaaS", link: "/decisions/ai/self-hosted-vs-saas/" },
                    { label: "Edge AI vs Cloud AI", link: "/decisions/ai/edge-vs-cloud-ai/" }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "🏛️ Engineering Governance",
          items: [
            {
              label: "Technical Governance",
              items: [
                {
                  label: "Engineering Standards",
                  items: [
                    { label: "Coding Standards", link: "/governance/engineering-standards/coding-standards/" },
                    { label: "Naming Conventions", link: "/governance/engineering-standards/naming-conventions/" },
                    { label: "Architecture Guidelines", link: "/governance/engineering-standards/architecture-guidelines/" }
                  ]
                },
                {
                  label: "Code Review",
                  items: [
                    { label: "Review Checklist", link: "/governance/code-review/review-checklist/" },
                    { label: "Common Anti Pattern", link: "/governance/code-review/common-anti-pattern/" },
                    { label: "Review Etiquette", link: "/governance/code-review/review-etiquette/" }
                  ]
                },
                {
                  label: "Documentation Governance",
                  items: [
                    { label: "ADR (Architecture Decision Record)", link: "/governance/documentation/adr/" },
                    { label: "RFC (Request For Comments)", link: "/governance/documentation/rfc/" },
                    { label: "Technical Specification", link: "/governance/documentation/technical-specification/" }
                  ]
                }
              ]
            },
            {
              label: "Architecture Governance",
              items: [
                {
                  label: "Architecture Review",
                  items: [
                    { label: "Architecture Approval Process", link: "/governance/architecture-review/approval-process/" },
                    { label: "Technical Risk Assessment", link: "/governance/architecture-review/risk-assessment/" }
                  ]
                },
                {
                  label: "Dependency Governance",
                  items: [
                    { label: "Open Source Evaluation", link: "/governance/dependency/open-source-evaluation/" },
                    { label: "Security Assessment", link: "/governance/dependency/security-assessment/" }
                  ]
                }
              ]
            },
            {
              label: "Security Governance",
              items: [
                {
                  label: "Secure Development",
                  items: [
                    { label: "Authentication Best Practice", link: "/governance/security/auth-best-practice/" },
                    { label: "Authorization", link: "/governance/security/authorization/" },
                    { label: "Data Protection", link: "/governance/security/data-protection/" }
                  ]
                },
                {
                  label: "Risk Management",
                  items: [
                    { label: "Threat Modeling", link: "/governance/security/threat-modeling/" },
                    { label: "Security Review", link: "/governance/security/security-review/" }
                  ]
                }
              ]
            },
            {
              label: "AI Governance",
              items: [
                {
                  label: "Responsible AI",
                  items: [
                    { label: "AI Ethics", link: "/governance/ai/ai-ethics/" },
                    { label: "Bias Awareness", link: "/governance/ai/bias-awareness/" },
                    { label: "Explainability", link: "/governance/ai/explainability/" }
                  ]
                },
                {
                  label: "AI Risk",
                  items: [
                    { label: "Hallucination Risk", link: "/governance/ai/hallucination-risk/" },
                    { label: "Prompt Injection", link: "/governance/ai/prompt-injection/" },
                    { label: "Data Leakage", link: "/governance/ai/data-leakage/" }
                  ]
                },
                {
                  label: "AI Security",
                  items: [
                    { label: "Model Security", link: "/governance/ai/model-security/" },
                    { label: "Agent Security", link: "/governance/ai/agent-security/" },
                    { label: "MCP Security", link: "/governance/ai/mcp-security/" }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "🚀 Projects",
          items: [
            {
              label: "Beginner Projects",
              items: [
                { label: "Todo App", link: "/projects/beginner/todo-app/" },
                { label: "Notes App", link: "/projects/beginner/notes-app/" }
              ]
            },
            {
              label: "Intermediate Projects",
              items: [
                { label: "E-Commerce", link: "/projects/intermediate/e-commerce/" },
                { label: "Chat Application", link: "/projects/intermediate/chat-app/" }
              ]
            },
            {
              label: "Advanced Projects",
              items: [
                { label: "Marketplace", link: "/projects/advanced/marketplace/" },
                { label: "SaaS Dashboard", link: "/projects/advanced/saas-dashboard/" }
              ]
            },
            {
              label: "AI Projects",
              items: [
                { label: "RAG Chatbot", link: "/projects/ai/rag-chatbot/" },
                { label: "MCP Server", link: "/projects/ai/mcp-server/" },
                { label: "AI Agent", link: "/projects/ai/ai-agent/" }
              ]
            },
            {
              label: "Open Source Projects",
              items: [
                { label: "Flutter Package", link: "/projects/opensource/flutter-package/" },
                { label: "AI Tooling", link: "/projects/opensource/ai-tooling/" },
                { label: "Engineering Utilities", link: "/projects/opensource/engineering-utilities/" }
              ]
            }
          ]
        },
        {
          label: "💼 Career",
          items: [
            {
              label: "Career Path",
              items: [
                { label: "Mobile Engineer", link: "/career/path/mobile-engineer/" },
                { label: "Backend Engineer", link: "/career/path/backend-engineer/" },
                { label: "AI Engineer", link: "/career/path/ai-engineer/" },
                { label: "Agent Engineer", link: "/career/path/agent-engineer/" },
                { label: "Technical Lead", link: "/career/path/technical-lead/" }
              ]
            },
            {
              label: "Portfolio",
              items: [
                { label: "Portfolio Strategy", link: "/career/portfolio/strategy/" },
                { label: "Project Presentation", link: "/career/portfolio/project-presentation/" },
                { label: "Case Study Writing", link: "/career/portfolio/case-study/" }
              ]
            },
            {
              label: "Resume",
              items: [
                { label: "ATS Friendly Resume", link: "/career/resume/ats-friendly/" },
                { label: "Resume Review", link: "/career/resume/resume-review/" }
              ]
            },
            {
              label: "Interview",
              items: [
                { label: "Technical Interview", link: "/career/interview/technical/" },
                { label: "System Design Interview", link: "/career/interview/system-design/" },
                { label: "Behavioral Interview", link: "/career/interview/behavioral/" }
              ]
            },
            {
              label: "Freelancing",
              items: [
                { label: "Finding Clients", link: "/career/freelance/finding-clients/" },
                { label: "Pricing Strategy", link: "/career/freelance/pricing/" },
                { label: "Proposal Writing", link: "/career/freelance/proposal-writing/" }
              ]
            },
            {
              label: "Personal Branding",
              items: [
                { label: "LinkedIn", link: "/career/branding/linkedin/" },
                { label: "GitHub", link: "/career/branding/github/" },
                { label: "Technical Writing", link: "/career/branding/technical-writing/" },
                { label: "Public Speaking", link: "/career/branding/public-speaking/" }
              ]
            }
          ]
        },
        {
          label: "📚 Engineering Handbook",
          items: [
            { label: "Flutter Engineering Handbook", link: "/handbook/flutter-engineering/" },
            { label: "Architecture Handbook", link: "/handbook/architecture/" },
            { label: "Backend Handbook", link: "/handbook/backend/" },
            { label: "AI Engineering Handbook", link: "/handbook/ai-engineering/" },
            { label: "Governance Handbook", link: "/handbook/governance/" },
            { label: "Decision Making Handbook", link: "/handbook/decision-making/" }
          ]
        },
        {
          label: "🙋 About",
          items: [
            { label: "About CodingSkuy", link: "/about/codingskuy/" },
            { label: "About Rois", link: "/about/rois/" },
            { label: "Teaching Philosophy", link: "/about/teaching-philosophy/" },
            { label: "Open Source Contributions", link: "/about/open-source/" },
            { label: "Contact", link: "/about/contact/" }
          ]
        }
      ],
    }),
  ],
});
