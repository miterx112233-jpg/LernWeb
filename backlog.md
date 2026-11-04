# Product Backlog: LernWeb — Roadmap ความรู้ Software Engineer ในยุค AI

เอกสารนี้รวบรวมรายการงานที่ต้องพัฒนา (Product Backlog) แบ่งตามเฟสการทำงาน (Phases/Epics) และลำดับความสำคัญ เพื่อให้การพัฒนาเว็บไซต์เป็นระบบและตรวจสอบความครบถ้วนของแต่ละหน้าได้ชัดเจน

---

## สรุปสถานะภาพรวม (Milestone Tracker)
- [x] **Phase 0: Planning & Specification** — วิเคราะห์โครงสร้างหน้าเว็บ ออกแบบ UI/UX สไตล์ 9Expert และจัดทำไฟล์ `cntext.md`, `Design.md`, `backlog.md`
- [x] **Phase 1: Core Layout, Design System & Navigation (Next.js App Router)** — โครงสร้างหลักของเว็บด้วย Next.js, แถบเมนูสไตล์ 9Expert พร้อม Dropdown, สวิตช์ Light/Dark Mode และระบบสลับหน้าแยกแต่ละ Route
- [x] **Phase 2: 9Expert-Style Lesson Reader & Sticky TOC** — หน้าอ่านบทเรียน (`/lesson/[slug]`) พร้อมแบนเนอร์กราฟิก Isometric, เนื้อหาแบบมีโครงสร้าง และกล่อง `สารบัญ` ด้านขวาที่เลื่อนตามหน้าจอ (Scroll-Spy)
- [x] **Phase 3: Interactive Roadmap (Basic -> Advanced)** — หน้าแผนผังการเรียนรู้ (`/roadmap`) สาย Software Engineer ยุค AI เรียงลำดับจาก Basic, Intermediate ไปจนถึง Advanced
- [x] **Phase 4: Comprehensive Curriculum Content (12 Modules)** — เนื้อหาบทเรียนครบทั้ง 12 เรื่องสำคัญ พร้อมแผนภาพ ตัวอย่างโค้ด/Prompt และบทเรียนเรือธงเรื่อง LLM ตามภาพต้นแบบ
- [x] **Phase 5: Articles Hub, Instant Search & AI SE Toolkit** — หน้าค้นหาบทความทั้งหมด (`/articles`), หน้าเครื่องมือ/เช็กลิสต์สำหรับ SE ยุค AI (`/toolkit`) และระบบติดตามความคืบหน้า (`localStorage`)

---

## รายละเอียดงานแยกตาม Epic (Detailed Backlog Items)

### Epic 1: โครงสร้างหลักและระบบนำทาง (Core Shell & 9Expert Header)
| ID | ชื่องาน (Task / Feature) | ความสำคัญ | รายละเอียดและเกณฑ์การยอมรับ (Acceptance Criteria) | สถานะ |
| :--- | :--- | :---: | :--- | :---: |
| **BL-101** | ตั้งค่าโครงสร้างโปรเจกต์และ Design Tokens | P0 (สูงสุด) | สร้างโครงสร้างไฟล์ HTML5, CSS Variables (รองรับสีทั้งโหมดสว่างและมืดตาม `Design.md`), และฟอนต์ภาษาไทย/อังกฤษที่อ่านง่าย | `[ ] Todo` |
| **BL-102** | พัฒนา Top Navigation Bar สไตล์ 9Expert | P0 (สูงสุด) | มีโลโก้ด้านซ้าย, เมนูหลักพร้อม Dropdown (`หลักสูตร Roadmap`, `แผนผังการเรียนรู้`, `บทความทั้งหมด`, `AI SE Toolkit`, `ความก้าวหน้า`), ปุ่มค้นหา (`🔍`) และสวิตช์สลับโหมดสีทรงแคปซูลด้านขวาบน | `[ ] Todo` |
| **BL-103** | ระบบสลับโหมดสี (Light / Dark Mode Toggle) | P0 (สูงสุด) | กดสวิตช์มุมขวาบนเพื่อสลับระหว่างพื้นหลังสีขาวสะอาดตา (ค่าเริ่มต้นแบบ 9Expert) และโหมดมืดสำหรับนักพัฒนา พร้อมบันทึกค่าลง `localStorage` | `[ ] Todo` |
| **BL-104** | ระบบนำทางระหว่าง 5 หน้าหลัก (SPA View Router) | P0 (สูงสุด) | สลับดูหน้า `หน้าแรก (Home)`, `แผนผังการเรียนรู้ (Roadmap)`, `หน้าบทเรียน (Lesson Detail)`, `คลังบทความ (Articles)`, และ `เครื่องมือ SE ยุค AI (Toolkit)` ได้ทันทีโดยไม่กระตุก | `[ ] Todo` |
| **BL-105** | ปุ่มลอยช่วยเหลือด่วน (Floating Quick Action Button) | P2 (กลาง) | ปุ่มกลมสีน้ำเงินมุมขวาล่าง (เหมือนภาพต้นแบบ 9Expert) สำหรับเปิดหน้าต่างสรุป Roadmap ด่วนหรือเลื่อนกลับขึ้นบนสุด | `[ ] Todo` |

---

### Epic 2: หน้าบทเรียนสไตล์ 9Expert (Article / Lesson Reader View)
| ID | ชื่องาน (Task / Feature) | ความสำคัญ | รายละเอียดและเกณฑ์การยอมรับ (Acceptance Criteria) | สถานะ |
| :--- | :--- | :---: | :--- | :---: |
| **BL-201** | โครงสร้างหน้าบทเรียน 2 คอลัมน์ + ลิงก์ย้อนกลับ | P0 (สูงสุด) | มีลิงก์ `< กลับไปยังบทความทั้งหมด` ด้านบนสุด แบ่งพื้นที่เป็นคอลัมน์เนื้อหาหลักด้านซ้าย (~70%) และคอลัมน์สารบัญด้านขวา (~30%) | `[ ] Todo` |
| **BL-202** | คอมโพเนนต์ Hero Banner Graphic ประจำบทเรียน | P0 (สูงสุด) | แบนเนอร์สี่เหลี่ยมขอบมนสีน้ำเงินเข้ม มีป้ายหมวดหมู่มุมซ้ายบน, โลโก้มุมขวาบน, ชื่อเรื่องสีส้ม/เขียวมิ้นต์/ขาว, ภาพประกอบกราฟิก Isometric 3D ด้านขวา และเครดิตผู้เขียนพร้อมคำว่า `Never Stop Learning` | `[ ] Todo` |
| **BL-203** | กล่อง `สารบัญ` ด้านขวาแบบเกาะติดหน้าจอ (Sticky TOC & Scroll-Spy) | P0 (สูงสุด) | สร้างรายการสารบัญอัตโนมัติจากหัวข้อ `H2` และหัวข้อย่อย `H3` (แสดงเครื่องหมาย `└` นำหน้าหัวข้อย่อย), คลิกแล้วเลื่อนไปยังหัวข้อนั้นอย่างนุ่มนวล และไฮไลต์หัวข้อที่กำลังอ่านอยู่ขณะเลื่อนหน้าจอ | `[ ] Todo` |
| **BL-204** | องค์ประกอบเนื้อหาบทเรียนเชิงเทคนิค (Rich Content Blocks) | P1 (สูง) | รองรับการแสดงผลแผนภาพการทำงาน (Visual Flow/Diagram), กล่องสรุปแนวคิดสำคัญ (Callout Box), ตัวอย่างโค้ด/Prompt พร้อมปุ่มคัดลอก, ตารางเปรียบเทียบ และกรณีศึกษาการใช้งานจริง (Case Study) | `[ ] Todo` |
| **BL-205** | แบบทดสอบท้ายบท (Mini Quiz) & ปุ่มเปลี่ยนบทเรียนตามลำดับ | P1 (สูง) | มีคำถามทบทวนความเข้าใจท้ายบท 2 ข้อ พร้อมปุ่ม `✓ ทำเครื่องหมายว่าเรียนจบแล้ว` และปุ่มกดไปยังบทเรียนก่อนหน้า/ถัดไปในลำดับ Roadmap | `[ ] Todo` |

---

### Epic 3: หน้าแผนผังการเรียนรู้ (Interactive Roadmap: Basic -> Advanced)
| ID | ชื่องาน (Task / Feature) | ความสำคัญ | รายละเอียดและเกณฑ์การยอมรับ (Acceptance Criteria) | สถานะ |
| :--- | :--- | :---: | :--- | :---: |
| **BL-301** | แผนผัง Roadmap เรียงลำดับ 3 ระดับ (Basic, Intermediate, Advanced) | P0 (สูงสุด) | แสดงเส้นทางการเรียนรู้เรียงตามลำดับขั้นตอนตั้งแต่บทที่ 1 ถึง 12 แยกสีและส่วนหัวชัดเจนระหว่าง Basic (สีเขียว), Intermediate (สีน้ำเงิน), และ Advanced (สีส้ม) | `[ ] Todo` |
| **BL-302** | การ์ดหัวข้อใน Roadmap (Roadmap Step Cards) | P0 (สูงสุด) | แต่ละการ์ดแสดงลำดับขั้น, ชื่อเรื่อง, เหตุผลว่าทำไม Software Engineer ยุค AI ต้องรู้เรื่องนี้, หัวข้อย่อยสำคัญ, เวลาเรียน และสถานะว่าเรียนจบหรือยัง | `[ ] Todo` |
| **BL-303** | ตัวกรองระดับความรู้และสายทักษะบนหน้า Roadmap | P1 (สูง) | สามารถกดกรองดูเฉพาะระดับ (`ทั้งหมด`, `Basic`, `Intermediate`, `Advanced`) หรือกรองตามหมวดทักษะ (`CS & Core`, `Full-Stack & Data`, `AI & LLM Engineering`, `Architecture & DevOps`) | `[ ] Todo` |
| **BL-304** | แถบสรุปความก้าวหน้าการเรียน (Overall Progress Bar) | P1 (สูง) | แสดงเปอร์เซ็นต์ความสำเร็จรวมของผู้เรียนและจำนวนบทที่เรียนจบในแต่ละระดับ อัปเดตแบบ Real-time เมื่อผู้เรียนกดจบแต่ละบท | `[ ] Todo` |

---

### Epic 4: เนื้อหาหลักสูตรสำหรับ Software Engineer ยุค AI (12 Core Modules)
| ID | ชื่องาน (Task / Feature) | ความสำคัญ | รายละเอียดและเกณฑ์การยอมรับ (Acceptance Criteria) | สถานะ |
| :--- | :--- | :---: | :--- | :---: |
| **BL-401** | เนื้อหาระดับที่ 1: **Basic Foundations (บทที่ 1 - 4)** | P0 (สูงสุด) | 1. **CS & Web How-it-works** (OS, CLI, HTTP/DNS, Client-Server)<br>2. **Programming Logic & Data Structures 101** (Variables, Control Flow, Array/Map/Tree, Big-O)<br>3. **Git, GitHub & Modern Workflow** (Branching, PR, Markdown)<br>4. **AI-Assisted Coding & Spec-Driven Basics** (การใช้ AI ช่วยเขียนโค้ด, การวางแผนด้วย `cntext.md`, `Design.md`, `backlog.md`) | `[ ] Todo` |
| **BL-402** | เนื้อหาระดับที่ 2: **Intermediate Engineering (บทที่ 5 - 8)** | P0 (สูงสุด) | 5. **Modern Frontend Architecture** (HTML/CSS/JS, Component State, Responsive UI)<br>6. **Backend Engineering & API Design** (REST API, Auth/JWT, Validation)<br>7. **Database Systems (SQL, NoSQL & Vector Intro)** (ER Diagram, Indexing, พื้นฐานฐานข้อมูลยุคใหม่)<br>8. **Clean Code, Architecture & Automated Testing** (SOLID, การรีวิวโค้ดจาก AI, Unit/Integration Test) | `[ ] Todo` |
| **BL-403** | เนื้อหาเรือธงระดับที่ 3 (บทที่ 9): **Large Language Model (LLM) คืออะไร?** | P0 (สูงสุด) | สร้างเนื้อหาบทเรียนเรื่อง **LLM & Generative AI** ให้ตรงตามภาพตัวอย่างของ 9Expert ครบทุกหัวข้อย่อยในสารบัญ (LLM คืออะไร, LLM ทำงานอย่างไร, รูปตัวอย่างการคาดการณ์คำถัดไป, ตัวอย่าง LLM, เกี่ยวข้องกับงานธุรกิจและวิศวกรรมซอฟต์แวร์อย่างไร, Case Study และการใช้ AI Copilot) | `[ ] Todo` |
| **BL-404** | เนื้อหาระดับที่ 3 ส่วนขยาย: **Advanced AI & Production Scale (บทที่ 10 - 12)** | P1 (สูง) | 10. **RAG & Vector Databases** (การเชื่อม LLM เข้ากับข้อมูลองค์กร)<br>11. **AI Agents, Function Calling & MCP** (การสร้างระบบ Agentic Workflow)<br>12. **System Design, Cloud DevOps & AI Security** (Scaling, Docker/CI/CD, OWASP Top 10 & Prompt Injection Defense) | `[ ] Todo` |

---

### Epic 5: หน้าแรก, คลังบทความ, ระบบค้นหา และหน้าเครื่องมือ AI SE Toolkit
| ID | ชื่องาน (Task / Feature) | ความสำคัญ | รายละเอียดและเกณฑ์การยอมรับ (Acceptance Criteria) | สถานะ |
| :--- | :--- | :---: | :--- | :---: |
| **BL-501** | พัฒนาหน้าแรก (Home Overview Page) | P1 (สูง) | มี Hero Section แนะนำแพลตฟอร์ม, การ์ดสรุป 3 ระดับความรู้, ตารางเปรียบเทียบ Traditional SE vs AI-Era SE, และส่วนแสดงบทความแนะนำ | `[ ] Todo` |
| **BL-502** | พัฒนาหน้าคลังบทความและระบบค้นหาทันที (Articles Hub & Search Modal) | P1 (สูง) | ค้นหาบทความได้จากทุกหน้าผ่านปุ่มแว่นขยาย หรือกรองดูในหน้าคลังบทความด้วยป้ายหมวดหมู่และระดับความยาก | `[ ] Todo` |
| **BL-503** | พัฒนาหน้าเครื่องมือ Software Engineer ยุค AI (AI SE Toolkit Page) | P2 (กลาง) | รวบรวมเทมเพลต `cntext.md`, `Design.md`, `backlog.md` พร้อมปุ่มกด Copy, เช็กลิสต์ตรวจโค้ดที่ AI เขียน (AI Code Review Checklist), และหน้าสรุปผลการเรียนส่วนตัว | `[ ] Todo` |
| **BL-504** | ตรวจสอบการแสดงผลบนมือถือและแท็บเล็ต (Responsive QA) | P1 (สูง) | ทดสอบการย่อหน้าจอบนมือถือ ให้เมนูและกล่อง `สารบัญ` ปรับรูปแบบเป็น Mobile-Friendly อ่านง่ายไม่ล้นจอ | `[ ] Todo` |

