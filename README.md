# Project Context: LernWeb — คลังความรู้และ Roadmap สำหรับ Software Engineer ในยุค AI

## 1. ภาพรวมโปรเจกต์ (Project Vision & Overview)
**LernWeb** คือแพลตฟอร์มการเรียนรู้และคลังความรู้ (Knowledge Hub & Interactive Roadmap) ที่รวบรวม **พื้นฐานและองค์ความรู้ที่ Software Engineer ในยุค AI จำเป็นต้องรู้ทั้งหมด** โดยจัดเรียงลำดับการเรียนรู้เป็นขั้นตอนตั้งแต่ **ระดับเริ่มต้น (Basic) -> ระดับกลาง (Intermediate) -> ระดับสูง (Advanced)** เพื่อให้ผู้เรียนสามารถคลิกเข้าไปศึกษาแต่ละหัวข้อได้อย่างเป็นระบบ

ในยุคที่ AI (เช่น LLM, Coding Agents, Copilot) เข้ามาเปลี่ยนวิธีการเขียนโค้ด บทบาทของ Software Engineer ได้เปลี่ยนจาก **"ผู้พิมพ์โค้ดทีละบรรทัด"** ไปสู่ **"ผู้ออกแบบระบบ กำหนดบริบท (Context/Spec) ตรวจสอบคุณภาพ และผสาน AI เข้ากับซอฟต์แวร์"** เว็บไซต์นี้จึงถูกสร้างขึ้นเพื่อปูพื้นฐานทั้ง Computer Science ดั้งเดิมที่ห้ามขาด และทักษะยุค AI สมัยใหม่ควบคู่กันไป

รูปแบบการจัดวางหน้าเว็บและประสบการณ์การอ่าน (UI/UX) ถอดแบบความเรียบง่าย อ่านสบายตา และเป็นมืออาชีพมาจาก **9Expert Training** ที่โดดเด่นด้วยแบนเนอร์กราฟิกสรุปหัวข้อ, โครงสร้างบทความที่ไล่ระดับชัดเจน และกล่อง **สารบัญ (Sticky Table of Contents)** ด้านขวามือที่ช่วยให้ผู้เรียนเห็นภาพรวมของเนื้อหาอยู่เสมอ

---

## 2. ทำไมต้อง "Software Engineer ในยุค AI"? (Problem & Value Proposition)
1. **ใช้ AI เขียนโค้ดได้ แต่ถ้าไม่มีพื้นฐานจะแก้บั๊กและออกแบบระบบไม่ได้:** คนจำนวนมากใช้ AI สร้างโค้ดได้เร็วขึ้น แต่เมื่อระบบซับซ้อนขึ้นกลับไม่เข้าใจเรื่อง Architecture, Database, Security หรือ Network ทำให้ไปต่อไม่ได้
2. **ความรู้กระจัดกระจาย ไม่รู้ควรเริ่มเรียนอะไรก่อน-หลัง:** มีเนื้อหาทั้งเรื่อง Programming พื้นฐาน และเรื่องใหม่อย่าง LLM, RAG, Agentic Workflow ปะปนกันจนผู้เรียนสับสน
3. **ทางออกของ LernWeb:** จัดทำ **Structured Roadmap (Basic -> Advanced)** ที่เชื่อมโยงพื้นฐานวิศวกรรมซอฟต์แวร์เข้ากับทักษะยุค AI พร้อมบทเรียนที่อ่านเข้าใจง่ายเหมือนอ่านบทความคุณภาพของ 9Expert

---

## 3. โครงสร้างเนื้อหาตามลำดับ Roadmap (Curriculum: Basic -> Advanced)

เนื้อหาถูกแบ่งออกเป็น **3 ระดับหลัก (12 โมดูลสำคัญ)** เรียงลำดับจากพื้นฐานที่ต้องแน่น ไปสู่การพัฒนาระบบระดับสูงในยุค AI:

### 🟢 ระดับที่ 1: Basic — รากฐานวิศวกรรมซอฟต์แวร์และการทำงานร่วมกับ AI (Foundations)
> เป้าหมาย: เข้าใจการทำงานของคอมพิวเตอร์ เว็บ โลจิกการเขียนโปรแกรม และการใช้ AI ช่วยเรียน/ช่วยเขียนโค้ดอย่างถูกวิธี
1. **Computer Science & Web Fundamentals:** คอมพิวเตอร์ทำงานอย่างไร, OS, Terminal/CLI, การทำงานของ Internet (DNS, IP, HTTP/HTTPS, Client-Server Architecture)
2. **Programming Logic & Data Structures 101:** แนวคิดการเขียนโปรแกรม (Variables, Control Flow, Functions, OOP พื้นฐาน) และโครงสร้างข้อมูลที่พบบ่อย (Array, Hash Map, Tree, Complexity $O(n)$)
3. **Git, GitHub & Modern Developer Workflow:** การจัดการเวอร์ชันของโค้ด, Branching Strategy, Pull Request และการเขียนเอกสาร Markdown
4. **AI-Assisted Coding & Context Engineering Basics:** พื้นฐานการใช้ AI ช่วยเขียนโค้ด, การตั้งคำถาม (Prompting สำหรับ Developer), และการวางโครงสร้างไฟล์ `context.md`, `Design.md`, `backlog.md` (Spec-Driven Development)

### 🔵 ระดับที่ 2: Intermediate — การพัฒนาระบบ Full-Stack และการควบคุมคุณภาพโค้ด (Core Software Engineering)
> เป้าหมาย: สร้างแอปพลิเคชันได้ครบวงจร ออกแบบฐานข้อมูลได้ และสามารถตรวจสอบ/ทดสอบโค้ดที่เขียนเองหรือที่ AI สร้างขึ้นได้อย่างมั่นใจ
5. **Modern Frontend Architecture:** HTML5, CSS3, JavaScript/TypeScript, แนวคิด Component-Based UI, State Management และ Responsive Design
6. **Backend Engineering & API Design:** การออกแบบ RESTful API, JSON Schema, Authentication & Authorization (JWT, OAuth2), Middleware และการจัดการ Error
7. **Database Systems (SQL, NoSQL & Vector Intro):** การออกแบบตารางข้อมูล (ER Diagram, Normalization), การเขียน SQL, Indexing และการรู้จักฐานข้อมูลสำหรับ AI เบื้องต้น
8. **Clean Code, Software Architecture & Automated Testing:** SOLID Principles, Design Patterns พื้นฐาน, การทำ Code Review โค้ดจาก AI, และการเขียน Unit / Integration / E2E Test

### 🟠 ระดับที่ 3: Advanced — การผสาน AI เข้าระบบจริง และสถาปัตยกรรมสเกลใหญ่ (AI Engineering & Production Scale)
> เป้าหมาย: เข้าใจการทำงานเชิงลึกของ LLM, สร้างระบบ AI ในองค์กร, ดูแลความปลอดภัย และสเกลระบบบน Cloud
9. **Large Language Models (LLM) & Generative AI Deep Dive:** LLM คืออะไร? ทำงานอย่างไร? (Tokenization, Next-Token Prediction, Transformer, Context Window, Temperature) และการเชื่อมต่อ LLM API ในระบบธุรกิจ *(บทเรียนเรือธงตามภาพต้นแบบ 9Expert)*
10. **RAG (Retrieval-Augmented Generation) & Vector Databases:** การทำให้ AI ตอบคำถามจากฐานข้อมูลภายในองค์กร, Embedding Models, Chunking Strategies และ Semantic Search
11. **AI Agents, Tool Calling & Multi-Agent Systems:** การสร้าง AI ที่เรียกใช้ฟังก์ชันและเครื่องมือภายนอกได้ (Function Calling, MCP, Agent Loop, Guardrails)
12. **System Design, Cloud DevOps & AI Security:** การสเกลระบบ (Caching, Load Balancer, Message Queue), Docker & CI/CD, ความปลอดภัยทางไซเบอร์ (OWASP Top 10) และการป้องกันช่องโหว่ของ AI (Prompt Injection & Data Privacy)

---

## 4. โครงสร้างหน้าเว็บไซต์ทั้งหมด (Site Map & Page-by-Page Breakdown)

จากการวิเคราะห์ความต้องการของผู้เรียนและรูปแบบของ **9Expert** เว็บไซต์ประกอบด้วย **5 หน้าหลัก (Views/Pages)** ดังนี้:

### หน้า 1: หน้าแรก (Home / Overview Page)
- **สิ่งที่ต้องมี:**
  - **Top Navigation Bar (สไตล์ 9Expert):** โลโก้เว็บซ้ายมือ, เมนูหลักตรงกลาง (`Roadmap การเรียนรู้`, `ระดับความรู้ v`, `คลังบทความ`, `AI SE Toolkit`, `ความคืบหน้าของฉัน`), ปุ่มค้นหา (`🔍`) และสวิตช์สลับโหมด **Light / Dark Mode** ด้านขวาบน
  - **Hero Section:** หัวข้อหลักแนะนำแพลตฟอร์ม *"เส้นทางสู่การเป็น Software Engineer ในยุค AI (Basic to Advanced)"* พร้อมปุ่ม `เริ่มเรียนตาม Roadmap` และ `สำรวจบทความทั้งหมด`
  - **Learning Stage Cards (3 ระดับ):** การ์ดสรุปภาพรวมระดับ Basic, Intermediate และ Advanced แสดงจำนวนบทเรียนและเปอร์เซ็นต์ที่เรียนจบแล้ว
  - **Featured Lessons (บทเรียนแนะนำ):** แสดงการ์ดบทเรียนไฮไลต์ (เช่น *"Large Language Model (LLM) คืออะไร? ช่วยในงานธุรกิจและงานพัฒนาซอฟต์แวร์ได้อย่างไร"*)

### หน้า 2: หน้าแผนผังการเรียนรู้ (Interactive Roadmap Page)
- **สิ่งที่ต้องมี:**
  - **Visual Step-by-Step Roadmap:** แผนผังเรียงลำดับจากข้อ 1 ถึง 12 แบ่งตามระดับ Basic -> Intermediate -> Advanced อย่างชัดเจน
  - **Topic Node Card:** แต่ละหัวข้อแสดงชื่อเรื่อง, ลำดับขั้น, เวลาที่ใช้เรียนโดยประมาณ, หมวดหมู่ทักษะ (Core CS / Full-Stack / AI Engineering / Architecture) และสถานะ (`ยังไม่เรียน` / `กำลังเรียน` / `เรียนจบแล้ว`)
  - **Filter & Track Selector:** ตัวกรองเพื่อดูเฉพาะระดับ (เช่น ดูเฉพาะ Basic) หรือดูตามสายทักษะ
  - **Quick Preview Drawer:** คลิกที่หัวข้อเพื่อดูสรุปย่อและหัวข้อย่อยก่อนกดเข้าสู่หน้าบทเรียนเต็ม

### หน้า 3: หน้าเนื้อหาบทเรียน (Lesson / Article Detail Page — อ้างอิงภาพต้นแบบ 9Expert)
- **สิ่งที่ต้องมี:**
  - **Back Link (Breadcrumb):** ลิงก์ `< กลับไปยังบทความทั้งหมด / Roadmap` สีน้ำเงินด้านบนสุดของเนื้อหา
  - **โครงสร้าง 2 คอลัมน์ (Main Content 70% + Sticky Sidebar 30%):**
    - **คอลัมน์ซ้าย (เนื้อหาหลัก):**
      1. **Hero Banner Graphic:** แบนเนอร์สี่เหลี่ยมขอบมน โทนสีน้ำเงินเข้ม มีป้ายกำกับหมวดหมู่ที่มุมซ้ายบน, โลโก้ที่มุมขวาบน, ชื่อเรื่องขนาดใหญ่โดดเด่น, ภาพกราฟิก 3D Isometric ด้านขวา และข้อความเครดิตด้านล่าง
      2. **Metadata Line:** ข้อความ `บทความโดย: LernWeb Team` พร้อมป้ายระดับความยาก (เช่น `Advanced • AI Engineering`) และเวลาในการอ่าน
      3. **Article Title (H1) & Structured Sections (H2, H3):**
         - อธิบายความหมายและแนวคิดพื้นฐาน (คืออะไร? ทำไมจึงสำคัญ?)
         - หลักการทำงานพร้อมแผนภาพจำลอง (How it works + Visual Diagram)
         - ตัวอย่างการประยุกต์ใช้จริง / ตัวอย่างโค้ด / ตัวอย่าง Prompt (Case Study & Code Examples)
         - สรุปสิ่งที่ Software Engineer ต้องนำไปใช้ (Actionable Takeaways)
      4. **Knowledge Check (Mini Quiz):** คำถามสั้นๆ 2 ข้อท้ายบทเพื่อเช็คความเข้าใจ
      5. **Bottom Roadmap Navigation:** ปุ่ม `✓ ทำเครื่องหมายว่าเรียนจบแล้ว` และปุ่มเดินหน้า/ถอยหลังไปยังบทเรียนถัดไปในลำดับ Roadmap
    - **คอลัมน์ขวา (Sticky Sidebar):**
      1. **กล่อง `สารบัญ` (Table of Contents):** การ์ดกรอบโค้งมน แสดงหัวข้อหลักและหัวข้อย่อย (`└`) ในบทความ คลิกเพื่อเลื่อนไปยังส่วนนั้นได้ทันที และไฮไลต์หัวข้อที่กำลังอ่านอยู่โดยอัตโนมัติ
      2. **กล่องสถานะใน Roadmap:** แสดงลำดับของบทเรียนนี้ในสาย Roadmap และปุ่มลัดไปยังบทถัดไป
  - **Floating Action Button:** ปุ่มกลมสีน้ำเงินที่มุมขวาล่างสำหรับเปิดผู้ช่วยค้นหาด่วนหรือกลับขึ้นด้านบน

### หน้า 4: หน้าคลังบทความทั้งหมด (All Articles & Search Page)
- **สิ่งที่ต้องมี:**
  - ช่องค้นหาบทเรียนแบบ Real-time (ค้นหาจากชื่อเรื่อง, คำสำคัญ, หรือเทคโนโลยี)
  - ปุ่มกรองตามระดับ (`ทั้งหมด`, `Basic`, `Intermediate`, `Advanced`) และตามหมวดหมู่ (`CS Basics`, `Web & API`, `Clean Code & Testing`, `LLM & AI Engineering`, `System Design`)
  - ตารางการ์ดบทความ (Article Grid) ที่แสดงภาพแบนเนอร์ย่อของแต่ละบทเรียนในสไตล์เดียวกับ 9Expert

### หน้า 5: หน้าคลังเครื่องมือและเช็กลิสต์ยุค AI (AI-Era SE Toolkit & Progress Page)
- **สิ่งที่ต้องมี:**
  - **Spec-Driven Development Templates:** ตัวอย่างการเขียน `context.md`, `Design.md`, `backlog.md` สำหรับสั่งงาน AI Coding Agent อย่างมืออาชีพ (สามารถกด Copy ไปใช้งานได้ทันที)
  - **AI Code Review Checklist:** รายการตรวจสอบความถูกต้อง ความปลอดภัย และประสิทธิภาพของโค้ดที่สร้างโดย AI
  - **Learning Progress Summary:** แดชบอร์ดสรุปว่าผู้เรียนผ่านบทเรียนในระดับ Basic, Intermediate, Advanced ไปแล้วกี่เปอร์เซ็นต์ พร้อมปุ่ม Reset หรือส่งออกความคืบหน้า

---

## 5. แนวทางทางเทคนิค (Technical Stack & Constraints)
- **รูปแบบแอปพลิเคชัน:** Modern Responsive Web Application (SPA / Multi-View Architecture ด้วย HTML5, CSS3, Vanilla JavaScript ES6+ แบบ Modular หรือสามารถรันได้ทันทีโดยไม่ต้องพึ่งพา Backend Server ซับซ้อน)
- **การจัดการข้อมูล (Data-Driven Content):** เก็บข้อมูล Roadmap และเนื้อหาบทเรียนทั้งหมดในโครงสร้างข้อมูลที่เป็นระเบียบ (Structured JS/JSON Modules) เพื่อให้แต่ละบทเรียนมีเนื้อหาครบถ้วน มีหัวข้อย่อยสำหรับสร้าง `สารบัญ` อัตโนมัติ และมีกราฟิกแบนเนอร์ประจำบทเรียน
- **การบันทึกข้อมูลผู้ใช้:** ใช้ `localStorage` สำหรับเก็บสถานะบทเรียนที่เรียนจบแล้ว (`completedLessons`), คำตอบแบบทดสอบย่อย และโหมดสีของหน้าจอ (`theme: light | dark`)

