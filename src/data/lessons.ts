export type LevelId = 'basic' | 'intermediate' | 'advanced';

export interface LevelInfo {
  id: LevelId;
  no: number;
  label: string;
  name: string;
  title: string;
  desc: string;
}

export interface SubSection {
  id: string;
  h: string;
  html: string;
}

export interface LessonSection {
  id: string;
  h: string;
  html: string;
  sub?: SubSection[];
}

export interface QuizItem {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface LessonVideo {
  url: string;       // วางลิงก์ YouTube ได้ทุกแบบ เช่น https://www.youtube.com/watch?v=... หรือ https://youtu.be/...
  title: string;     // ชื่อคลิปที่จะแสดงใต้กรอบวิดีโอ
  channel?: string;  // ชื่อช่อง YouTube
  duration?: string; // ความยาวคลิป เช่น "10:25"
}

export type CourseId = 'core' | 'ai-future';

export interface Lesson {
  id: string;
  course?: CourseId; // ไม่ระบุ = หลักสูตรที่ 1 (core)
  no: number;
  level: LevelId;
  category: string;
  keyword: string;
  subtitle: string;
  tagline: string;
  title: string;
  summary: string;
  why: string;
  minutes: number;
  topics: string[];
  videos?: LessonVideo[];
  sections: LessonSection[];
  quiz: QuizItem[];
}

/* =====================================================================
   จุดแก้ไขลิงก์ YouTube ของทั้ง 12 บทเรียน (รองรับหลายคลิปต่อ 1 บทเรียน)
   วางลิงก์ปกติจากเบราว์เซอร์ได้เลย ระบบจะแปลงเป็น Embed + Playlist ให้อัตโนมัติ
   ===================================================================== */
export const LESSON_VIDEOS: Record<string, LessonVideo[]> = {
  // บทที่ 01 (Basic): คอมพิวเตอร์และเว็บทำงานอย่างไร (DNS, IP, HTTP, Web Browser, Server)
  'how-computers-web-work': [
    {
      url: 'https://www.youtube.com/watch?v=XygSfbIO4no',
      title: 'มาหาคำตอบว่า จริงๆ แล้ว Web Browser แสดงผลเว็บเราได้ยังไง?'
    },
    {
      url: 'https://www.youtube.com/watch?v=xbGMS3LSr88',
      title: 'Ep.9 มาทำความรู้จัก HTTP Request แบบไว ๆ ! - สาระเดฟใน 3 นาที Season 2'
    },
    {
      url: 'https://www.youtube.com/watch?v=tLwzLs0vBJI',
      title: 'Ep.12 404 500 200 คืออะไร สำคัญยังไงกับคนทำเว็บ - สาระเดฟใน 3 นาที Season 2'
    },
    {
      url: 'https://www.youtube.com/watch?v=gXnGpJ4ACTQ',
      title: 'อยากสร้างระบบของตัวเอง เลือก Server แบบไหนให้เหมาะกับเราดีนะ !?'
    }
  ],

  // บทที่ 02 (Basic): Logic และ Data Structures (Algorithm, Array, Big-O Notation)
  'logic-data-structures': [
    {
      url: 'https://www.youtube.com/watch?v=mntUEoQZ2FY',
      title: 'ทำไมต้องเข้าใจ Algorithm #1 | dev 101'
    },
    {
      url: 'https://www.youtube.com/watch?v=t9Vixss6Un4',
      title: 'Basic Data Structure ที่ควรรู้ก่อนเขียนโปรแกรม'
    },
    {
      url: 'https://www.youtube.com/watch?v=lWHbg1SrUqc',
      title: 'Basic Big O เรื่องที่ทำให้เด็กมหาลัยหลายๆคนปวดหัว !!!'
    },
    {
      url: 'https://www.youtube.com/watch?v=Bd85jc6rVFg',
      title: 'EP 2. Big O คืออะไร ? - สาระเดฟใน 3 นาที'
    }
  ],

  // บทที่ 03 (Basic): Git และการทำงานเป็นทีม (commit, branch, pull request)
  'git-github': [
    {
      url: 'https://www.youtube.com/watch?v=5TlGWHU_SQc',
      title: 'EP.29 What’s New - สอนใช้งาน Git คลิปเดียวจบ รู้เรื่อง ใช้งานเป็น !',
      duration: '17:00'
    },
    {
      url: 'https://www.youtube.com/watch?v=fOlDcMStMXE',
      title: 'เรียนฟรี!! GitHub For Developer 2 ชั่วโมงเต็ม ตั้งแต่เริ่มต้นจนถึงระดับมือโปร',
      duration: '2:00:00'
    },
    {
      url: 'https://www.youtube.com/watch?v=qGbdmJGild8',
      title: 'Git กับ GitHub คืออะไร และต่างกันยังไงนะ ? #Shorts'
    },
    {
      url: 'https://www.youtube.com/watch?v=oxoIr7TyGMs',
      title: 'Git CLI vs GitHub Desktop'
    }
  ],

  // บทที่ 04 (Basic): ใช้ AI ช่วยเขียนโค้ดอย่างถูกวิธี (Prompt / การตรวจแก้โค้ดจาก AI)
  'ai-assisted-coding': [
    {
      url: 'https://www.youtube.com/watch?v=tz5MDEtNJww',
      title: 'อย่าเพิ่งใช้ AI ช่วยเขียนโค้ด ถ้ายังไม่รู้ 5 เรื่องนี้ !'
    },
    {
      url: 'https://www.youtube.com/watch?v=z6_6JwAwOzI',
      title: '6 เรื่องที่ต้องรู้ ! ก่อนใช้ AI เขียนโค้ด | borntodev',
      channel: 'borntodev'
    },
    {
      url: 'https://www.youtube.com/watch?v=YXqB5YrpNO0',
      title: 'เทคนิค Prompt ใช้ AI รีวิวโค้ดแบบไม่หลอน'
    },
    {
      url: 'https://www.youtube.com/watch?v=QgkLBmLH3Go',
      title: 'รีวิว ‘Claude Code’ AI เขียนโค้ดที่ใครๆ ก็ใช้กัน?! | Dev รีวิววว ! SS2',
      channel: 'borntodev'
    }
  ],

  // บทที่ 05 (Intermediate): Frontend สมัยใหม่ (HTML/CSS/JS & State ใน React/Next.js)
  'modern-frontend': [
    {
      url: 'https://www.youtube.com/watch?v=gNg_pKbH0os',
      title: 'EP 31. เรียนรู้ React ใน 180 วินาที !! - สาระเดฟ ใน 3 นาที'
    },
    {
      url: 'https://www.youtube.com/watch?v=wOkeNFRlS-g',
      title: 'พามาลองใช้ React ฉบับผู้เริ่มต้นสร้างหน้าเว็บไซต์ (ใช้ Vite สร้างโปรเจกต์)'
    },
    {
      url: 'https://www.youtube.com/watch?v=-ZX2LnFXgPs',
      title: 'เลือกอะไรดี ? React กับ Next.js ตัวไหนเหมาะกับเราที่สุด'
    },
    {
      url: 'https://www.youtube.com/watch?v=-jzu5YH6OMQ',
      title: 'มาเรียนเขียนเว็บด้วย HTML 5 !! ฉบับที่เร็วที่สุด !'
    }
  ],

  // บทที่ 06 (Intermediate): Backend และการออกแบบ API (RESTful API & Authentication)
  'backend-api': [
    {
      url: 'https://www.youtube.com/watch?v=GqzpqlA3kds',
      title: 'API แบบครบ จบ ในคลิปเดียว!!!'
    },
    {
      url: 'https://www.youtube.com/watch?v=zEuBMWLiI0U',
      title: 'สร้างแอปง่าย ๆ แค่รู้จักให้ "อภัย" - API 101 คืออิหยังวะ ?'
    },
    {
      url: 'https://www.youtube.com/watch?v=GROy9XvvXpk',
      title: 'มาลองดูหลักการทำงานของ API แบบง่าย ๆ กัน'
    },
    {
      url: 'https://www.youtube.com/watch?v=f0mQvHevxfw',
      title: 'สร้าง API อยากให้คนอื่นใช้ ต้องทำยังไง (Swagger / Backend)'
    }
  ],

  // บทที่ 07 (Intermediate): ฐานข้อมูล SQL / NoSQL และช่องโหว่ SQL Injection
  'database-systems': [
    {
      url: 'https://www.youtube.com/watch?v=kTQLhbSk-_w',
      title: 'EP 24. รู้จัก NoSQL ฉบับเร็วจนไฟลุก - สาระเดฟ ใน 3 นาที'
    },
    {
      url: 'https://www.youtube.com/watch?v=Op53ZTK4djY',
      title: 'EP 3. SQL Injection สุดอันตรายของสายทำเว็บ - สาระเดฟใน 3 นาที'
    },
    {
      url: 'https://www.youtube.com/watch?v=3DF30NI_ZVI',
      title: 'SQL และ NoSQL แตกต่างกันยังไง? เหมาะกับลักษณะงานแบบไหน?',
      channel: 'MilerDev'
    }
  ],

  // บทที่ 08 (Intermediate): Clean Code และการเขียน Test (Unit Test / Software Testing)
  'clean-code-testing': [
    {
      url: 'https://www.youtube.com/watch?v=tyIGCoBFwdA',
      title: 'สรุปครบจบ พื้นฐานที่ต้องรู้ของการทำ Software Testing ในคลิปเดียว'
    },
    {
      url: 'https://www.youtube.com/watch?v=bb5_6xz9Abc',
      title: 'สอนเขียน Unit Testing และ Integration Testing ด้วย Python'
    },
    {
      url: 'https://www.youtube.com/watch?v=zeJKmHtX9HU',
      title: 'ทำไม Unit Test ถึงเขียนยาก ?'
    },
    {
      url: 'https://www.youtube.com/watch?v=0BgpB9wGw4s',
      title: 'Hexagonal Architecture ดียังไง ? ทำไมเดฟต้องรู้ (การจัดโครงสร้างโค้ดให้สะอาดและดูแลง่าย)'
    }
  ],

  // บทที่ 09 (Advanced): Large Language Model (LLM) คืออะไร?
  'llm': [
    {
      url: 'https://www.youtube.com/watch?v=ZjprauCXE6c',
      title: 'รู้จัก Ollama ฉบับรวบรัดใน 3 นาที (การรันโมเดล LLM บนเครื่องตัวเอง)'
    },
    {
      url: 'https://www.youtube.com/watch?v=HJscCkvy5W0',
      title: 'Dev ยุค AI ต้องรู้ LLM, RAG, Agent, Fine-tuning คืออะไร? ดูจบบรรลุ!',
      channel: 'MilerDev'
    }
  ],

  // บทที่ 10 (Advanced): RAG และ Vector Database
  'rag': [
    {
      url: 'https://www.youtube.com/watch?v=hJVlTpVYnf8',
      title: '‘RAG’ เทคนิคที่ทำให้ AI เก่งขึ้น! | dev 101'
    },
    {
      url: 'https://www.youtube.com/watch?v=_T3hEr60xtc',
      title: 'สร้างแชทถามตอบข้อมูลสินค้าแบบง่าย ๆ ด้วย LangChain'
    }
  ],

  // บทที่ 11 (Advanced): AI Agents และ Tool Calling
  'ai-agents': [
    {
      url: 'https://www.youtube.com/watch?v=4SL84LmJQD0',
      title: '‘Agentic AI’ มาแรงกว่าที่คิด ! และอาจจะแรงยันปีหน้า | borntoDev',
      channel: 'borntoDev'
    },
    {
      url: 'https://www.youtube.com/watch?v=lCyj4D8zsNU',
      title: 'Ask Prame : AI Agent ทำงานแทนเราได้ยังไง?'
    },
    {
      url: 'https://www.youtube.com/watch?v=vEKvWj1rKC4',
      title: 'Ask Prame : พื้นฐานที่ต้องมี ก่อนเรียน MCP'
    },
    {
      url: 'https://www.youtube.com/watch?v=m4T6hPfU0Uk',
      title: 'สาย AI ห้ามพลาด กับ 4 Use Cases จับคู่ MCP กับ Claude'
    },
    {
      url: 'https://www.youtube.com/watch?v=EKtvfPWAydI',
      title: 'ทำไงให้ “AI” ที่ใช้อยู่เก่งขึ้น ! ได้ตามที่ต้องการแบบล้านเปอร์เซนต์ (#mcp)'
    }
  ],

  // บทที่ 12 (Advanced): System Design และ Security
  'system-design-security': [
    {
      url: 'https://www.youtube.com/watch?v=spvP2EDWMVg',
      title: 'ปูพื้นฐาน Cyber Security 101 จัดเต็ม ครบ จบ ในคลิปเดียว!'
    },
    {
      url: 'https://www.youtube.com/watch?v=aozgSX7IK30',
      title: 'ทำไมเวลาเข้าถึงข้อมูลแบบไวๆ ต้องใช้งาน Cache'
    },
    {
      url: 'https://www.youtube.com/watch?v=_ErhwTPSpws',
      title: 'API Gateway vs Load Balancer: What Every Developer Should Know!',
      channel: 'ByteMonk'
    }
  ]
};

export const LEVELS: LevelInfo[] = [
  {
    id: 'basic',
    no: 1,
    label: 'ระดับ 1 · BASIC',
    name: 'Basic',
    title: 'พื้นฐานที่ทุกคนต้องมี',
    desc: 'เข้าใจว่าคอมพิวเตอร์และเว็บทำงานอย่างไร คิดเป็นขั้นตอน ใช้ Git และเริ่มใช้ AI ช่วยงานอย่างถูกวิธี'
  },
  {
    id: 'intermediate',
    no: 2,
    label: 'ระดับ 2 · INTERMEDIATE',
    name: 'Intermediate',
    title: 'สร้างระบบให้ใช้งานได้จริง',
    desc: 'ทำได้ทั้งหน้าบ้านและหลังบ้าน ออกแบบฐานข้อมูลเป็น และตรวจคุณภาพโค้ดด้วยการรีวิวและการเขียน Test'
  },
  {
    id: 'advanced',
    no: 3,
    label: 'ระดับ 3 · ADVANCED',
    name: 'Advanced',
    title: 'ระบบขนาดใหญ่และงาน AI',
    desc: 'เข้าใจ LLM เชิงลึก เอา AI มาต่อกับระบบจริง และออกแบบระบบที่รองรับผู้ใช้จำนวนมากอย่างปลอดภัย'
  }
];

export const LESSONS: Lesson[] = [
  /* ======================= BASIC ======================= */
  {
    id: 'how-computers-web-work',
    no: 1,
    level: 'basic',
    category: 'CS Fundamentals',
    keyword: 'WEB',
    subtitle: 'How Computers & the Web Work',
    tagline: 'DNS, IP, HTTP, Browser และ Server',
    title: 'คอมพิวเตอร์และเว็บทำงานอย่างไร? (DNS, IP, HTTP, Web Browser, Server)',
    summary: 'เข้าใจว่า Web Browser แสดงผลหน้าเว็บได้อย่างไร การทำงานของ HTTP Request, รหัสสถานะ 200 / 404 / 500 และวิธีเลือก Server',
    why: 'ถ้าไม่รู้ว่าข้อมูลวิ่งจาก Browser ไปหา Server อย่างไร เวลาเว็บช้าหรือขึ้นรหัส 404 / 500 จะไม่รู้เลยว่าต้องเริ่มหาปัญหาจากตรงไหน',
    minutes: 15,
    topics: ['Web Browser & DNS', 'HTTP Request', 'Status 200 / 404 / 500', 'การเลือก Server'],
    sections: [
      {
        id: 'how-browser-renders',
        h: '1. Web Browser แสดงผลหน้าเว็บเราได้อย่างไร?',
        html: `
          <p>ทุกครั้งที่เราพิมพ์ชื่อเว็บไซต์ (URL) เช่น <code>https://lernweb.dev</code> ลงใน Web Browser แล้วกด Enter เบราว์เซอร์ไม่ได้เสกหน้าเว็บขึ้นมาเอง แต่ทำหน้าที่เป็นตัวกลางที่ติดต่อขอไฟล์จากเครื่องเซิร์ฟเวอร์มาวาดขึ้นหน้าจอตามลำดับนี้</p>
          <div class="flow"><span>พิมพ์ URL</span><i>→</i><span>ถาม DNS หาเลข IP</span><i>→</i><span>ส่ง HTTP Request ไปที่ Server</span><i>→</i><span>ได้ไฟล์ HTML / CSS / JS</span><i>→</i><span>Browser วาดหน้าเว็บ (Render)</span></div>`,
        sub: [
          {
            id: 'dns-ip',
            h: 'DNS และ IP Address — สมุดโทรศัพท์ของโลกอินเทอร์เน็ต',
            html: `<p>คอมพิวเตอร์ทุกเครื่องบนอินเทอร์เน็ตติดต่อกันด้วยหมายเลข <strong>IP Address</strong> (เช่น <code>172.67.10.5</code>) แต่คนเราจำชื่อโดเมนได้ง่ายกว่า ระบบ <strong>DNS (Domain Name System)</strong> จึงทำหน้าที่แปลงชื่อเว็บไซต์ให้กลายเป็นเลข IP เพื่อพาเราไปถูกเครื่อง</p>`
          },
          {
            id: 'dom-render',
            h: 'จากโค้ดกลายเป็นภาพบนหน้าจอ',
            html: `<p>เมื่อได้รับไฟล์กลับมา Browser จะอ่าน <strong>HTML</strong> เพื่อสร้างโครงสร้างหน้าเว็บ (DOM), อ่าน <strong>CSS</strong> เพื่อจัดสีและขนาด และรัน <strong>JavaScript</strong> เพื่อให้หน้าเว็บโต้ตอบกับผู้ใช้ได้ <em>(ดูเพิ่มเติมได้ในคลิปที่ 1 ด้านล่าง)</em></p>`
          }
        ]
      },
      {
        id: 'http-request-basics',
        h: '2. ทำความรู้จัก HTTP Request แบบเข้าใจไว',
        html: `
          <p><strong>HTTP (HyperText Transfer Protocol)</strong> คือข้อตกลงที่ใช้ส่งข้อความคุยกันระหว่างฝั่งผู้ขอข้อมูล (Client / Browser) กับฝั่งผู้ให้บริการ (Server)</p>
          <p>ในหนึ่งคำขอ (HTTP Request) จะประกอบด้วย 3 ส่วนสำคัญ:</p>
          <pre><code>POST /api/login HTTP/1.1
Host: lernweb.dev
Content-Type: application/json

{"email": "user@example.com"}</code></pre>
          <table>
            <tr><th>ส่วนประกอบ</th><th>ความหมาย</th><th>ตัวอย่างที่ใช้บ่อย</th></tr>
            <tr><td><strong>Method</strong></td><td>บอกว่าจะทำอะไรกับข้อมูล</td><td><code>GET</code> (ขออ่าน), <code>POST</code> (ส่งข้อมูลใหม่), <code>PUT/PATCH</code> (แก้ไข), <code>DELETE</code> (ลบ)</td></tr>
            <tr><td><strong>Headers</strong></td><td>ข้อมูลกำกับคำขอ</td><td>ชนิดข้อมูล (<code>Content-Type</code>), ข้อมูลยืนยันตัวตน (<code>Authorization</code>)</td></tr>
            <tr><td><strong>Body</strong></td><td>เนื้อข้อมูลที่ส่งไป</td><td>ข้อมูลฟอร์ม หรือ JSON ที่ส่งตอนกดปุ่มบันทึก</td></tr>
          </table>
          <p><em>(สอดคล้องกับคลิปที่ 2: มาทำความรู้จัก HTTP Request แบบไว ๆ)</em></p>`
      },
      {
        id: 'http-status-codes',
        h: '3. รหัส 200, 404, 500 คืออะไร สำคัญอย่างไรกับคนทำเว็บ?',
        html: `
          <p>เมื่อ Server รับคำขอไปแล้ว จะตอบกลับพร้อม <strong>HTTP Status Code (ตัวเลข 3 หลัก)</strong> เพื่อบอกผลลัพธ์ทันทีโดยไม่ต้องแกะเนื้อหาข้างในอ่านทั้งหมด</p>
          <table>
            <tr><th>หมวดหมู่</th><th>รหัสที่พบบ่อย</th><th>ความหมายและวิธีดูปัญหา</th></tr>
            <tr><td><strong>2xx (สำเร็จ)</strong></td><td><code>200 OK</code>, <code>201 Created</code></td><td>ทำงานสำเร็จตามที่ขอ</td></tr>
            <tr><td><strong>3xx (เปลี่ยนเส้นทาง)</strong></td><td><code>301</code>, <code>302</code></td><td>ย้ายหน้าเว็บไปที่ URL ใหม่ (Redirect)</td></tr>
            <tr><td><strong>4xx (ฝั่งผู้ขอผิดพลาด)</strong></td><td><code>400</code> ข้อมูลผิดรูปแบบ<br><code>401 / 403</code> ไม่มีสิทธิ์เข้าถึง<br><code>404 Not Found</code> ไม่พบหน้านี้</td><td>ต้องเช็กที่ฝั่ง Frontend ว่าส่ง URL หรือข้อมูลไปถูกต้องหรือไม่</td></tr>
            <tr><td><strong>5xx (ฝั่ง Server พัง)</strong></td><td><code>500 Internal Server Error</code><br><code>502 / 503</code> Server ล่มหรือรับไม่ไหว</td><td>โค้ดฝั่ง Backend มีบั๊ก หรือฐานข้อมูลมีปัญหา ต้องไปเปิดดู Log ที่ Server</td></tr>
          </table>
          <div class="note">จำง่ายๆ: <strong>เลข 4 นำหน้า = คนเรียกส่งมาผิด</strong> · <strong>เลข 5 นำหน้า = โค้ดหรือเครื่องฝั่ง Server พัง</strong> <em>(ดูเพิ่มเติมได้ในคลิปที่ 3)</em></div>`
      },
      {
        id: 'choosing-a-server',
        h: '4. อยากสร้างระบบของตัวเอง เลือก Server แบบไหนให้เหมาะกับงาน?',
        html: `
          <p>เมื่อเขียนเว็บเสร็จในเครื่องตัวเองแล้ว อยากเอาขึ้นให้คนอื่นเข้าใช้งานจริง เราต้องเช่าหรือเลือกใช้ Server ซึ่งมีหลายรูปแบบตามขนาดงานและงบประมาณ:</p>
          <table>
            <tr><th>รูปแบบ Server</th><th>ลักษณะการทำงาน</th><th>เหมาะกับงานแบบไหน</th></tr>
            <tr><td><strong>Shared Hosting</strong></td><td>แชร์เครื่องเดียวร่วมกับหลายเว็บไซต์ ราคาถูก</td><td>เว็บประชาสัมพันธ์ขนาดเล็ก ทราฟฟิกไม่สูง</td></tr>
            <tr><td><strong>VPS / Cloud VM</strong></td><td>แบ่งทรัพยากร CPU/RAM แยกชัดเจน ลงโปรแกรมเองได้อิสระ</td><td>ระบบหลังบ้านทั่วไปที่ต้องการควบคุมสภาพแวดล้อมเอง</td></tr>
            <tr><td><strong>PaaS / Serverless</strong> (เช่น Vercel, Render, Cloud Run)</td><td>ส่งแค่โค้ดขึ้นไป ระบบจัดการเครื่องและขยายขนาดให้อัตโนมัติ</td><td>โปรเจกต์สมัยใหม่ (เช่น Next.js) ที่ไม่อยากเสียเวลาดูแลเครื่องเซิร์ฟเวอร์เอง</td></tr>
            <tr><td><strong>Dedicated Server</strong></td><td>เช่าหรือซื้อเครื่องจริงทั้งเครื่อง</td><td>ระบบขนาดใหญ่ที่ต้องการประสิทธิภาพสูงและควบคุมฮาร์ดแวร์เต็มที่</td></tr>
          </table>
          <p><em>(ดูการเปรียบเทียบการเลือก Server ได้ในคลิปที่ 4 ด้านล่าง)</em></p>`
      }
    ],
    quiz: [
      { q: 'ถ้าเรียกใช้งาน API แล้วได้รหัส 500 Internal Server Error ควรตรวจสอบที่ส่วนใดก่อน', options: ['ตรวจสอบสายแลนของผู้ใช้', 'ตรวจสอบโค้ดและ Log ฝั่ง Server / Backend', 'เปลี่ยนชื่อโดเมนใหม่'], answer: 1, explain: 'รหัสหมวด 5xx หมายถึงเกิดข้อผิดพลาดขึ้นที่ฝั่ง Server หรือฐานข้อมูล' },
      { q: 'หน้าที่หลักของระบบ DNS (Domain Name System) คืออะไร', options: ['แปลงชื่อโดเมนให้เป็นหมายเลข IP Address', 'เก็บไฟล์รูปภาพของเว็บไซต์', 'ตรวจรหัสผ่านของผู้ใช้'], answer: 0, explain: 'DNS ช่วยแปลงชื่อเว็บไซต์ที่คนจำง่ายให้กลายเป็นเลข IP ของเครื่องเซิร์ฟเวอร์' },
      { q: 'เมื่อเบราว์เซอร์ได้รับไฟล์ HTML, CSS และ JavaScript จาก Server แล้ว ไฟล์ใดทำหน้าที่กำหนดโครงสร้างหลักของหน้าเว็บ (DOM)', options: ['CSS', 'HTML', 'DNS'], answer: 1, explain: 'HTML ทำหน้าที่กำหนดโครงสร้างเนื้อหา (DOM) ส่วน CSS จัดความสวยงาม และ JavaScript จัดการการโต้ตอบ' },
      { q: 'HTTP Method ใดที่ออกแบบมาเพื่อใช้ "ขออ่านหรือดึงข้อมูล" จาก Server โดยไม่แก้ไขข้อมูลเดิม', options: ['POST', 'DELETE', 'GET'], answer: 2, explain: 'GET ใช้สำหรับดึงข้อมูลอย่างเดียว ส่วน POST ใช้สร้างข้อมูลใหม่ และ DELETE ใช้ลบข้อมูล' },
      { q: 'ถ้าต้องการส่งข้อมูล JSON จากฟอร์มสมัครสมาชิกไปสร้างบัญชีใหม่บน Server ควรใส่ข้อมูลไว้ในส่วนใดของ HTTP Request', options: ['Request Body', 'ชื่อโดเมน', 'IP Address'], answer: 0, explain: 'ข้อมูลฟอร์มหรือ JSON ที่ส่งไป معคำสั่ง POST/PUT จะบรรจุอยู่ในส่วน Request Body' },
      { q: 'รหัสสถานะ HTTP 404 Not Found หมายความว่าอย่างไร', options: ['เซิร์ฟเวอร์ฐานข้อมูลล่ม', 'ไม่พบหน้าเว็บหรือ URL ที่ร้องขอ', 'เข้าสู่ระบบสำเร็จ'], answer: 1, explain: '404 Not Found หมายถึงฝั่งผู้ขอเรียกไปยัง URL หรือทรัพยากรที่ไม่มีอยู่บน Server' },
      { q: 'หากผู้ใช้ยังไม่ได้ล็อกอินแต่พยายามเรียก API ดึงข้อมูลส่วนตัว ระบบควรตอบกลับด้วยรหัสหมวดใด', options: ['200 OK', '401 Unauthorized / 403 Forbidden', '502 Bad Gateway'], answer: 1, explain: '401 และ 403 เป็นรหัสหมวด 4xx ที่ใช้แจ้งว่าผู้เรียกยังไม่ยืนยันตัวตนหรือไม่มีสิทธิ์เข้าถึงข้อมูลนั้น' },
      { q: 'ข้อใดคือความแตกต่างหลักระหว่างรหัส HTTP หมวด 4xx กับ 5xx', options: ['4xx เกิดจากคำขอฝั่ง Client ผิดพลาด ส่วน 5xx เกิดจากปัญหาฝั่ง Server', '4xx แปลว่าสำเร็จ ส่วน 5xx แปลว่าเปลี่ยนเส้นทาง', 'ไม่มีความแตกต่างกัน'], answer: 0, explain: 'เลข 4 นำหน้าหมายถึงฝั่งผู้เรียกส่งข้อมูลหรือ URL มาไม่ถูกต้อง ส่วนเลข 5 นำหน้าหมายถึงระบบฝั่ง Server มีปัญหา' },
      { q: 'หากต้องการนำเว็บ Next.js ขึ้นใช้งานจริงโดยไม่อยากดูแลตั้งค่าเครื่องเซิร์ฟเวอร์เอง ควรเลือกบริการแบบใด', options: ['PaaS / Serverless (เช่น Vercel, Render, Cloud Run)', 'ซื้อคอมพิวเตอร์ตั้งโต๊ะมาวางไว้ที่บ้าน', 'Shared Hosting รุ่นเก่าที่รองรับเฉพาะ HTML นิ่งๆ'], answer: 0, explain: 'บริการกลุ่ม PaaS / Serverless ช่วยจัดการการ Build, Deploy และขยายขนาดเซิร์ฟเวอร์ให้อัตโนมัติ' },
      { q: 'ส่วนประกอบใดใน HTTP Request ที่ใช้ระบุข้อมูลกำกับ เช่น Content-Type หรือ Authorization Token', options: ['HTTP Headers', 'HTML Footer', 'DNS Record'], answer: 0, explain: 'HTTP Headers ใช้ส่งข้อมูลกำกับคำขอ เช่น ชนิดของข้อมูล (Content-Type) และโทเคนยืนยันตัวตน (Authorization)' }
    ]
  },

  {
    id: 'logic-data-structures',
    no: 2,
    level: 'basic',
    category: 'Programming',
    keyword: 'LOGIC',
    subtitle: 'Algorithm, Data Structures & Big-O',
    tagline: 'คิดเป็นขั้นตอน เลือกโครงสร้างข้อมูล และวัดความเร็วโค้ด',
    title: 'Logic และ Data Structures (Algorithm, Array, Big-O Notation)',
    summary: 'ทำไมต้องเข้าใจ Algorithm ก่อนเขียนโค้ด โครงสร้างข้อมูลพื้นฐานที่ต้องรู้ และการวิเคราะห์ Big-O แบบไม่ปวดหัว',
    why: 'AI เขียนโค้ดตามคำสั่งได้เร็ว แต่ถ้าเราไม่เข้าใจ Algorithm กับ Big-O เราจะดูไม่ออกว่าโค้ดชุดนั้นจะค้างทันทีเมื่อใช้งานกับข้อมูลจริงจำนวนมาก',
    minutes: 16,
    topics: ['Algorithm คืออะไร', 'Array / Map / Stack / Queue', 'Big-O Notation', 'O(1) vs O(n) vs O(n²)'],
    sections: [
      {
        id: 'why-algorithm',
        h: '1. ทำไมคนเขียนโปรแกรมต้องเข้าใจ Algorithm?',
        html: `
          <p><strong>Algorithm (อัลกอริทึม)</strong> ไม่ใช่สูตรคณิตศาสตร์ที่ซับซ้อน แต่คือ <strong>ลำดับขั้นตอนการแก้ปัญหาที่ชัดเจนตั้งแต่ต้นจนจบ</strong> เหมือนสูตรทำอาหารที่บอกลำดับว่าต้องใส่อะไรก่อน-หลังเพื่อให้ได้ผลลัพธ์ที่ถูกต้องเสมอ</p>
          <ol>
            <li><strong>รับข้อมูลอะไรเข้ามา (Input)</strong> — เช่น รายการสินค้าทั้งหมดในร้าน</li>
            <li><strong>มีขั้นตอนประมวลผลอย่างไร (Process)</strong> — เช่น กรองเฉพาะชิ้นที่มีของในสต็อก แล้วเรียงตามราคาจากน้อยไปมาก</li>
            <li><strong>ส่งผลลัพธ์อะไรออกไป (Output)</strong> — เช่น รายการสินค้า 10 ชิ้นแรกที่ถูกที่สุด</li>
          </ol>
          <div class="note">การเขียนโค้ดคือการแปล Algorithm ให้เป็นภาษาคอมพิวเตอร์ ถ้าเราคิดลำดับขั้นตอนในหัวได้ชัดเจน ไม่ว่าจะเขียนเองหรือสั่ง AI ก็จะได้โค้ดที่ตรงจุด <em>(ดูเพิ่มเติมได้ในคลิปที่ 1)</em></div>`
      },
      {
        id: 'basic-data-structures',
        h: '2. Basic Data Structure ที่ควรรู้ก่อนเขียนโปรแกรม',
        html: `
          <p><strong>Data Structure (โครงสร้างข้อมูล)</strong> คือวิธีจัดระเบียบข้อมูลในหน่วยความจำ การเลือกโครงสร้างให้เหมาะกับงานช่วยให้เขียนโค้ดสั้นลงและทำงานเร็วขึ้นมาก</p>
          <table>
            <tr><th>โครงสร้างข้อมูล</th><th>ลักษณะการเก็บข้อมูล</th><th>เหมาะกับงานแบบไหน</th></tr>
            <tr><td><strong>Array / List</strong></td><td>เรียงต่อกันตามลำดับ มีหมายเลขกำกับ (Index 0, 1, 2...)</td><td>เก็บรายการข้อมูลที่ต้องเรียงลำดับ เช่น รายการบทเรียน รายการสินค้า</td></tr>
            <tr><td><strong>Hash Map / Object / Dictionary</strong></td><td>เก็บเป็นคู่ <code>Key → Value</code> ค้นหาจากชื่อ Key ได้ทันที</td><td>ค้นหาข้อมูลด้วยรหัส เช่น หาข้อมูลผู้ใช้จาก <code>userId</code></td></tr>
            <tr><td><strong>Stack (เข้าทีหลัง ออกก่อน — LIFO)</strong></td><td>เหมือนตั้งจานซ้อนกัน หยิบใบที่วางล่าสุดออกก่อน</td><td>ระบบปุ่มย้อนกลับ (Undo) หรือประวัติการเปิดหน้าเว็บ</td></tr>
            <tr><td><strong>Queue (เข้าก่อน ออกก่อน — FIFO)</strong></td><td>เหมือนต่อแถวซื้อของ คนมาถึงก่อนได้รับการประมวลผลก่อน</td><td>คิวส่งอีเมล คิวสั่งพิมพ์งาน หรือระบบจองคิว</td></tr>
          </table>
          <pre><code>// ตัวอย่างการเลือกใช้ Array คู่กับ Map
const users = [{ id: 'u01', name: 'ต้น' }, { id: 'u02', name: 'ฟ้า' }];
const userById = new Map(users.map(u =&gt; [u.id, u]));

// ค้นหาจาก Map ได้ทันทีโดยไม่ต้องวนลูปไล่หาทุกตัว
const target = userById.get('u02');</code></pre>
          <p><em>(ดูคำอธิบายแบบเห็นภาพได้ในคลิปที่ 2: Basic Data Structure ที่ควรรู้ก่อนเขียนโปรแกรม)</em></p>`
      },
      {
        id: 'big-o-explained',
        h: '3. ทำความเข้าใจ Big-O Notation แบบไม่ปวดหัว',
        html: `
          <p><strong>Big-O Notation</strong> คือวิธีวัดว่า <strong>เมื่อจำนวนข้อมูล ($n$) เพิ่มขึ้นมากๆ เวลาที่โค้ดใช้ทำงานจะเพิ่มขึ้นเร็วแค่ไหน</strong> เราไม่ดูเป็นวินาทีเพราะคอมพิวเตอร์แต่ละเครื่องเร็วไม่เท่ากัน แต่ดูที่ "จำนวนรอบการทำงาน"</p>
          <table>
            <tr><th>ระดับ Big-O</th><th>ชื่อเรียก</th><th>ลักษณะของโค้ด</th><th>ถ้าข้อมูลมี 10,000 ชิ้น</th></tr>
            <tr><td><code>O(1)</code></td><td>Constant Time</td><td>หยิบข้อมูลจากตำแหน่งที่รู้ทันที ไม่ขึ้นกับจำนวนข้อมูล</td><td>ทำแค่ 1 ครั้ง</td></tr>
            <tr><td><code>O(log n)</code></td><td>Logarithmic</td><td>แบ่งครึ่งข้อมูลในการค้นหาแต่ละรอบ (Binary Search)</td><td>ทำประมาณ 14 ครั้ง</td></tr>
            <tr><td><code>O(n)</code></td><td>Linear Time</td><td>วนลูปอ่านข้อมูล 1 รอบตั้งแต่ต้นจนจบ</td><td>ทำ 10,000 ครั้ง</td></tr>
            <tr><td><code>O(n²)</code></td><td>Quadratic Time</td><td><strong>ลูปซ้อนลูป</strong> เอาทุกตัวไปเทียบกับทุกตัว</td><td>ทำถึง <strong>100,000,000 ครั้ง!</strong></td></tr>
          </table>
          <div class="note note--warn"><strong>ข้อควรระวังเมื่อใช้ AI เขียนโค้ด:</strong> โค้ดที่มีลูปซ้อนลูป (<code>O(n²)</code>) มักรันผ่านฉลุยตอนทดสอบกับข้อมูลตัวอย่าง 10 แถว แต่พอนำไปใช้จริงกับข้อมูลลูกค้า 50,000 แถว ระบบจะค้างทันที <em>(ดูเพิ่มเติมได้ในคลิปที่ 3 และ 4 · และศึกษาเทคนิคเพิ่มเติมได้ในบทความ <a href="/articles/when-human-language-becomes-programming-language">เมื่อภาษามนุษย์กลายเป็นภาษาโปรแกรม</a>)</em></div>`
      }
    ],
    quiz: [
      { q: 'ระบบคิวงานที่ต้องการให้ "งานที่ส่งเข้ามาก่อน ได้รับการประมวลผลก่อน" ควรใช้โครงสร้างข้อมูลใด', options: ['Stack', 'Queue', 'Tree'], answer: 1, explain: 'Queue ทำงานแบบเข้าก่อนออกก่อน (FIFO — First In, First Out)' },
      { q: 'โค้ดที่มีการวนลูปซ้อนลูปเพื่อเปรียบเทียบข้อมูลทุกคู่ใน Array มักมีค่า Big-O เป็นเท่าใด', options: ['O(1)', 'O(n)', 'O(n²)'], answer: 2, explain: 'ลูปนอกทำงาน n รอบ และแต่ละรอบลูปในทำอีก n รอบ รวมเป็น n × n หรือ O(n²)' },
      { q: 'Algorithm (อัลกอริทึม) ในทางคอมพิวเตอร์หมายถึงอะไร', options: ['ลำดับขั้นตอนการแก้ปัญหาที่ชัดเจนตั้งแต่รับข้อมูลเข้าจนได้ผลลัพธ์', 'ชื่อยี่ห้อของการ์ดจอรุ่นใหม่', 'โปรแกรมสำหรับแต่งรูปภาพ'], answer: 0, explain: 'Algorithm คือลำดับขั้นตอนตรรกะในการแก้ปัญหาอย่างเป็นระบบตั้งแต่ Input → Process → Output' },
      { q: 'หากต้องการค้นหาข้อมูลผู้ใช้จาก userId ให้ได้ผลลัพธ์เร็วที่สุดโดยไม่ต้องวนลูปไล่เช็กทีละคน ควรเก็บข้อมูลในโครงสร้างใด', options: ['Hash Map / Object (Key-Value)', 'เรียงต่อกันในข้อความยาวๆ', 'Stack'], answer: 0, explain: 'Hash Map หรือ Dictionary สามารถเข้าถึงข้อมูลผ่าน Key ได้โดยตรงด้วยความเร็วระดับ O(1)' },
      { q: 'การทำงานของปุ่ม Undo (ย้อนกลับการกระทำล่าสุด) ในโปรแกรมแก้ไขข้อความ ใช้หลักการของโครงสร้างข้อมูลใด', options: ['Queue (เข้าก่อนออกก่อน)', 'Stack (เข้าทีหลังออกก่อน — LIFO)', 'Graph'], answer: 1, explain: 'ปุ่ม Undo จะดึงการกระทำที่เพิ่งทำล่าสุดออกมาแก้ไขก่อน จึงตรงกับหลัก LIFO ของ Stack' },
      { q: 'การดึงค่าจาก Array ด้วยหมายเลขตำแหน่งที่ทราบอยู่แล้ว เช่น items[0] มีความซับซ้อนทางเวลา (Big-O) เท่าใด', options: ['O(1) — Constant Time', 'O(n) — Linear Time', 'O(n²) — Quadratic Time'], answer: 0, explain: 'การเข้าถึงสมาชิกใน Array ด้วย Index โดยตรงใช้เวลาคงที่เสมอ ไม่ว่า Array จะมีขนาดใหญ่แค่ไหน' },
      { q: 'อัลกอริทึมการค้นหาแบบแบ่งครึ่งข้อมูลทีละรอบ (Binary Search) ในข้อมูลที่เรียงลำดับแล้ว มีค่า Big-O เป็นเท่าใด', options: ['O(log n)', 'O(n)', 'O(n!)'], answer: 0, explain: 'การตัดข้อมูลทิ้งครึ่งหนึ่งในทุกๆ รอบทำให้จำนวนครั้งการค้นหาเพิ่มขึ้นช้ามากในระดับลอการิทึม O(log n)' },
      { q: 'ทำไมโค้ดที่มีความซับซ้อนระดับ O(n²) ถึงมักผ่านการทดสอบในเครื่องนักพัฒนาแต่ไปค้างบนระบบจริง', options: ['เพราะในเครื่องทดสอบมักใช้ข้อมูลตัวอย่างแค่หลักสิบรายการ แต่ระบบจริงมีข้อมูลหลักหมื่นหรือแสนรายการ', 'เพราะเซิร์ฟเวอร์จริงไม่มีเมาส์และคีย์บอร์ด', 'เพราะภาษาโปรแกรมบนเซิร์ฟเวอร์เปลี่ยนไปเอง'], answer: 0, explain: 'เมื่อข้อมูล n เพิ่มจาก 10 เป็น 10,000 รอบการทำงานของ O(n²) จะพุ่งจาก 100 รอบเป็น 100,000,000 รอบทันที' },
      { q: 'หากต้องวนลูปอ่านรายการสินค้าทั้งหมด 1 รอบเพื่อหาผลรวมราคาสินค้า ค่า Big-O ของการทำงานนี้คือข้อใด', options: ['O(1)', 'O(n)', 'O(n²)'], answer: 1, explain: 'การวนลูปผ่านข้อมูลทุกตัว 1 รอบจะใช้เวลาแปรผันตรงตามจำนวนข้อมูล n จึงเป็น O(n)' },
      { q: 'ก่อนสั่งให้ AI เขียนฟังก์ชันประมวลผลข้อมูลชุดใหญ่ นักพัฒนาควรกำหนดสิ่งใดให้ชัดเจนเพื่อป้องกันปัญหาคอขวด', options: ['ระบุขนาดข้อมูลที่คาดว่าจะใช้งานและกำชับให้หลีกเลี่ยงลูปซ้อนลูป (O(n²)) โดยใช้ Map/Set ช่วยค้นหาแทน', 'สั่งให้ตั้งชื่อตัวแปรสั้นๆ ตัวอักษรเดียว', 'ห้ามใส่คอมเมนต์ในโค้ด'], answer: 0, explain: 'การบอกขนาดข้อมูลและกำหนดแนวทางใช้โครงสร้างข้อมูลที่ค้นหาได้ใน O(1) ช่วยให้ AI เขียนโค้ดที่มีประสิทธิภาพสูงขึ้น' }
    ]
  },

  {
    id: 'git-github',
    no: 3,
    level: 'basic',
    category: 'Developer Workflow',
    keyword: 'GIT',
    subtitle: 'Git, GitHub & Team Workflow',
    tagline: 'commit, branch, pull request และเครื่องมือที่ใช้จริง',
    title: 'Git และการทำงานเป็นทีม (commit, branch, pull request)',
    summary: 'เข้าใจความแตกต่างของ Git กับ GitHub, คำสั่ง Git ที่ใช้จริงในชีวิตประจำวัน, การทำงานร่วมกันด้วย Branch & Pull Request และการเลือกใช้ Git CLI vs GitHub Desktop',
    why: 'เมื่อทำงานร่วมกับทีมหรือให้ AI แก้โค้ดหลายไฟล์พร้อมกัน Git คือสิ่งเดียวที่ช่วยให้เราตรวจสอบความเปลี่ยนแปลงและย้อนกลับไปจุดที่ปลอดภัยได้เสมอ',
    minutes: 15,
    topics: ['Git vs GitHub', 'commit & branch', 'Pull Request', 'Git CLI vs Desktop'],
    sections: [
      {
        id: 'git-vs-github',
        h: '1. Git กับ GitHub คืออะไร และต่างกันอย่างไร?',
        html: `
          <p>มือใหม่หลายคนมักสับสนว่าสองคำนี้คือสิ่งเดียวกัน แต่จริงๆ แล้วทำหน้าที่คนละส่วนกัน:</p>
          <table>
            <tr><th>ชื่อ</th><th>คืออะไร</th><th>หน้าที่หลัก</th></tr>
            <tr><td><strong>Git</strong></td><td>โปรแกรมจัดการเวอร์ชันของโค้ด (Version Control) ที่รันอยู่ในเครื่องคอมพิวเตอร์ของเรา</td><td>คอยบันทึกประวัติการแก้ไขไฟล์ (commit), แยกสายงาน (branch) และย้อนเวลาโค้ด</td></tr>
            <tr><td><strong>GitHub</strong></td><td>เว็บไซต์และบริการ Cloud สำหรับเก็บโปรเจกต์ที่ใช้ Git บนออนไลน์</td><td>เป็นศูนย์กลางให้คนในทีมดึงโค้ดไปทำต่อ เปิด Pull Request เพื่อรีวิวโค้ดร่วมกัน และสำรองข้อมูล</td></tr>
          </table>
          <p><em>(ดูสรุปสั้นๆ ได้ในคลิปที่ 3: Git กับ GitHub คืออะไร และต่างกันยังไงนะ)</em></p>`
      },
      {
        id: 'essential-git',
        h: '2. สอนใช้งาน Git พื้นฐาน: คำสั่งที่ได้ใช้ทุกวัน',
        html: `
          <p>ในการทำงานจริง เราจะใช้คำสั่งหลักๆ เพียงไม่กี่คำสั่งเพื่อบันทึกงานเป็นระยะ:</p>
          <pre><code>git init                         # เริ่มต้นใช้งาน Git ในโฟลเดอร์โปรเจกต์
git status                       # เช็กว่ามีไฟล์ไหนถูกแก้ไขหรือเพิ่มเข้ามาบ้าง
git diff                         # เปิดดูบรรทัดที่ถูกแก้เทียบกับเวอร์ชันก่อนหน้า
git add .                        # เลือกไฟล์ที่แก้แล้วเตรียมบันทึก
git commit -m "เพิ่มหน้าแผนผังการเรียน"  # บันทึกเป็นจุดอ้างอิงพร้อมคำอธิบาย
git push origin main             # ส่งโค้ดที่บันทึกแล้วขึ้นไปเก็บที่ GitHub</code></pre>
          <div class="note"><strong>นิสัยที่ดีของนักพัฒนา:</strong> บันทึก (commit) ทุกครั้งที่ทำฟีเจอร์ย่อยเสร็จ 1 เรื่อง และก่อนสั่งให้ AI แก้โค้ดชุดใหญ่ ให้ commit งานที่ทำงานได้แล้วเก็บไว้ก่อนเสมอ <em>(ดูวิธีใช้งานครบจบในคลิปที่ 1)</em></div>`
      },
      {
        id: 'branch-and-pr',
        h: '3. การทำงานเป็นทีมด้วย Branch และ Pull Request บน GitHub',
        html: `
          <p>เวลาทำงานร่วมกันหลายคน เราจะไม่แก้โค้ดทับลงไปที่สายหลัก (<code>main</code>) โดยตรง เพราะถ้าโค้ดเรายังไม่เสร็จจะทำให้เพื่อนคนอื่นรันโปรเจกต์ไม่ได้ ขั้นตอนมาตรฐานของทีมคือ:</p>
          <div class="flow"><span>สายหลัก (main)</span><i>→</i><span>แตก Branch ใหม่</span><i>→</i><span>เขียนโค้ด &amp; commit</span><i>→</i><span>Push ขึ้น GitHub</span><i>→</i><span>เปิด Pull Request (PR)</span><i>→</i><span>ทีมช่วยกันรีวิวแล้ว Merge</span></div>
          <ul>
            <li><strong>Branch:</strong> เหมือนการทำสำเนาโปรเจกต์แยกออกมาทดลองทำฟีเจอร์ของตัวเองโดยไม่กระทบงานหลัก</li>
            <li><strong>Pull Request (PR):</strong> การขอเอาโค้ดจาก Branch ของเรารวมกลับเข้าสายหลัก โดยเพื่อนร่วมทีมสามารถเข้ามาอ่านโค้ดและคอมเมนต์จุดที่ควรปรับปรุงได้ทีละบรรทัด <em>(ดูเจาะลึกได้ในคลิปที่ 2)</em></li>
          </ul>`
      },
      {
        id: 'cli-vs-desktop',
        h: '4. Git CLI vs GitHub Desktop เลือกใช้อะไรดี?',
        html: `
          <table>
            <tr><th>เครื่องมือ</th><th>จุดเด่น</th><th>เหมาะกับเมื่อไหร่</th></tr>
            <tr><td><strong>Git CLI (พิมพ์คำสั่งใน Terminal)</strong></td><td>ทำงานได้ทุกเครื่องรวมถึงบน Server จริง เข้าใจกลไกของ Git ได้ลึกซึ้ง และมีครบทุกฟีเจอร์</td><td>ควรฝึกพื้นฐานให้เป็น เพราะใช้ได้กับทุกสภาพแวดล้อม</td></tr>
            <tr><td><strong>GitHub Desktop / โปรแกรม GUI ใน VS Code</strong></td><td>เห็นบรรทัดโค้ดที่เพิ่ม/ลบด้วยสีเขียว-แดงชัดเจน กดเลือก commit เฉพาะบางบรรทัดได้ง่ายมาก</td><td>เหมาะมากเวลาใช้ตรวจดูความเปลี่ยนแปลง (Diff) ก่อนกดยืนยันโค้ดที่ AI เขียน</td></tr>
          </table>
          <p>สรุปคือ <strong>ไม่จำเป็นต้องเลือกอย่างใดอย่างหนึ่ง</strong> นักพัฒนาส่วนใหญ่ใช้คู่กัน: ใช้ GUI ดูเปรียบเทียบไฟล์ที่เปลี่ยน และใช้ CLI เมื่อต้องการรันคำสั่งที่รวดเร็ว <em>(ดูเปรียบเทียบในคลิปที่ 4)</em></p>`
      }
    ],
    quiz: [
      { q: 'ข้อใดอธิบายความแตกต่างระหว่าง Git กับ GitHub ได้ถูกต้อง', options: ['เป็นโปรแกรมตัวเดียวกันแต่เปลี่ยนชื่อ', 'Git คือระบบเก็บประวัติโค้ดในเครื่อง ส่วน GitHub คือเว็บฝากโปรเจกต์ Git บนออนไลน์ให้ทีมทำงานร่วมกัน', 'Git ต้องต่ออินเทอร์เน็ตตลอดเวลา ส่วน GitHub ไม่ต้อง'], answer: 1, explain: 'Git คือเครื่องมือ Version Control ส่วน GitHub คือแพลตฟอร์มออนไลน์สำหรับเก็บ Repository และทำงานร่วมกัน' },
      { q: 'ทำไมการทำฟีเจอร์ใหม่ในทีมจึงควรแยกทำใน Branch แทนการแก้ที่ main โดยตรง', options: ['เพื่อให้แก้โค้ดและทดสอบได้โดยไม่ทำให้โค้ดหลักของทีมพัง และเปิด Pull Request ให้รีวิวก่อนรวมโค้ดได้', 'เพราะ Git ไม่ยอมให้ commit ที่ main', 'เพื่อประหยัดพื้นที่ฮาร์ดดิสก์'], answer: 0, explain: 'การแยก Branch ช่วยป้องกันไม่ให้โค้ดที่ยังไม่สมบูรณ์ไปกระทบงานของคนอื่น และเปิดโอกาสให้รีวิวผ่าน Pull Request ก่อน' },
      { q: 'คำสั่งใดใช้ตรวจสอบว่าขณะนี้มีไฟล์ใดในโปรเจกต์ที่ถูกแก้ไขหรือยังไม่ได้บันทึกเข้า Git บ้าง', options: ['git status', 'git init', 'git clone'], answer: 0, explain: 'git status ใช้ดูสถานะของไฟล์ทั้งหมดใน Working Directory และ Staging Area' },
      { q: 'หากต้องการดูรายละเอียดบรรทัดโค้ดที่ถูกเพิ่มหรือลบไปก่อนจะกด commit ควรใช้คำสั่งใด', options: ['git diff', 'git push', 'git branch'], answer: 0, explain: 'git diff แสดงบรรทัดที่เปลี่ยนแปลงเปรียบเทียบกับเวอร์ชันก่อนหน้าแบบบรรทัดต่อบรรทัด' },
      { q: 'ขั้นตอนที่ถูกต้องในการบันทึกโค้ดลงประวัติ Git และส่งขึ้นไปยัง GitHub คือข้อใด', options: ['git add → git commit → git push', 'git push → git init → git status', 'git pull → git diff → git clone'], answer: 0, explain: 'ต้องเลือกไฟล์เข้า Staging (git add) บันทึกจุดอ้างอิงพร้อมข้อความ (git commit) แล้วจึงส่งขึ้นเซิร์ฟเวอร์ (git push)' },
      { q: 'Pull Request (PR) บน GitHub มีประโยชน์หลักอย่างไรในการทำงานร่วมกัน', options: ['ใช้ขอรวมโค้ดจาก Branch ย่อยเข้าสายหลัก พร้อมเปิดให้เพื่อนร่วมทีมช่วยตรวจทานโค้ดและคอมเมนต์ก่อน Merge', 'ใช้ลบโปรเจกต์ออกจากระบบ', 'ใช้เปลี่ยนรหัสผ่านของสมาชิกในทีม'], answer: 0, explain: 'Pull Request เป็นหัวใจของการทำ Code Review และการตรวจสอบคุณภาพโค้ดก่อนนำเข้าสู่สายหลัก' },
      { q: 'ก่อนสั่งให้ AI แก้ไขโค้ดชุดใหญ่หลายไฟล์ นักพัฒนาควรทำสิ่งใดใน Git ก่อนเสมอ', options: ['ทำการ git commit งานที่ทำงานได้ปกติเก็บไว้เป็นจุดปลอดภัยก่อน', 'ลบโฟลเดอร์ .git ทิ้ง', 'ปิดหน้าจอโปรแกรมแก้ไขโค้ด'], answer: 0, explain: 'การ commit เก็บสถานะที่ทำงานได้ไว้ก่อน ทำให้สามารถย้อนกลับ (Revert/Checkout) ได้ทันทีหาก AI แก้โค้ดพัง' },
      { q: 'ไฟล์ใดที่ใช้กำหนดรายชื่อไฟล์หรือโฟลเดอร์ที่ไม่ต้องการให้ Git นำขึ้นไปเก็บไว้บน GitHub (เช่น .env หรือ node_modules)', options: ['.gitignore', 'package.json', 'README.md'], answer: 0, explain: 'ไฟล์ .gitignore ใช้ระบุรายชื่อไฟล์ความลับและโฟลเดอร์ไลบรารีที่ไม่ควรนำขึ้น Repository' },
      { q: 'เมื่อเพื่อนร่วมทีมอัปเดตโค้ดใหม่ขึ้นไปบน GitHub แล้ว เราต้องการดึงโค้ดล่าสุดลงมาที่เครื่องตัวเองควรใช้คำสั่งใด', options: ['git pull', 'git init', 'git rm'], answer: 0, explain: 'git pull ทำหน้าที่ดึงการเปลี่ยนแปลงล่าสุดจาก Remote Repository มารวมเข้ากับโค้ดในเครื่องของเรา' },
      { q: 'การใช้โปรแกรม GUI อย่าง GitHub Desktop หรือแถบ Source Control ใน VS Code มีข้อดีเด่นอย่างไรเมื่อทำงานร่วมกับ AI', options: ['ช่วยให้มองเห็นบรรทัดโค้ดที่ AI เพิ่มหรือลบด้วยสีเขียว-แดงชัดเจนและเลือกตรวจทีละไฟล์ได้ง่าย', 'ทำให้ไม่ต้องติดตั้ง Git ในเครื่อง', 'ช่วยเขียนโค้ดแทน AI ทั้งหมด'], answer: 0, explain: 'หน้าตาแบบ GUI ช่วยให้กวาดสายตาตรวจทาน Diff ของแต่ละไฟล์ที่ AI แก้ไขได้อย่างละเอียดและรวดเร็ว' }
    ]
  },

  {
    id: 'ai-assisted-coding',
    no: 4,
    level: 'basic',
    category: 'AI Workflow',
    keyword: 'AI CODE',
    subtitle: 'AI-Assisted Coding & Review',
    tagline: 'การสั่งงาน แก้บั๊ก และตั้งค่า Spec File ในโปรเจกต์จริง',
    title: 'ใช้ AI ช่วยเขียนโค้ดอย่างถูกวิธี (Prompt แก้บั๊ก / รีวิวโค้ด / การวางไฟล์ Spec)',
    summary: 'แนวปฏิบัติเชิงวิศวกรรมเมื่อใช้ AI เขียนโค้ด, การแกะ Stack Trace ส่งให้ AI แก้บั๊กและรีวิวโค้ดแบบไม่หลอน (Hallucination) และการวางไฟล์ Spec (context.md, Design.md, backlog.md) สำหรับ AI Coding Agent',
    why: 'ในฐานะวิศวกรซอฟต์แวร์ เราไม่ได้ใช้ AI แค่เสกโค้ดขึ้นมาลอยๆ แต่ต้องรู้วิธีส่งบริบทโค้ดจริง แกะ Error Log และวางโครงสร้างไฟล์ควบคุม AI ใน Repository ให้ทำงานร่วมกับทีมได้อย่างเป็นระบบ',
    minutes: 16,
    topics: ['กฎวิศวกรรมเมื่อใช้ AI', 'แกะ Stack Trace & รีวิวโค้ด', 'ป้องกันอาการหลอน', 'วางไฟล์ Spec ในโปรเจกต์'],
    sections: [
      {
        id: 'things-to-know-before-ai',
        h: '1. กฎเหล็กทางวิศวกรรมก่อนนำโค้ดจาก AI เข้าสู่ Repository',
        html: `
          <p>ในมุมของวิศวกรรมซอฟต์แวร์ การใช้ AI ช่วยเขียนโค้ดในโปรเจกต์จริงต้องมีขั้นตอนควบคุมคุณภาพที่ชัดเจน 6 ข้อดังนี้:</p>
          <ol>
            <li><strong>คุณยังเป็นเจ้าของและผู้รับผิดชอบโค้ดทุกบรรทัด (Code Ownership):</strong> เวลาโปรแกรมมีปัญหาบน Production เราต้องอธิบายและแก้ไขได้เอง ดังนั้นห้าม Merge โค้ดที่ตัวเองยังไม่เข้าใจลอจิกการทำงาน</li>
            <li><strong>ระวังอาการหลอนทางเทคนิค (Technical Hallucination):</strong> AI อาจแต่งชื่อฟังก์ชัน เรียกใช้ไลบรารีที่ไม่มีอยู่จริง หรือเขียน Syntax ของเฟรมเวิร์กเวอร์ชันเก่าที่เลิกใช้ไปแล้ว (Deprecated)</li>
            <li><strong>ตรวจสอบ Dependencies ทุกครั้ง:</strong> ก่อนรัน <code>npm install</code> ตามที่ AI แนะนำ ต้องเช็กว่าแพ็กเกจนั้นมีอยู่จริงในโปรเจกต์หรือจำเป็นต้องลงเพิ่มจริงๆ หรือไม่</li>
            <li><strong>แยกไฟล์ความลับด้วย Environment Variables (<code>.env</code>):</strong> ห้ามก๊อปปี้ API Key, รหัสผ่านฐานข้อมูล หรือข้อมูลจริงของลูกค้าส่งเข้า Prompt สาธารณะ ให้ส่งเฉพาะชื่อตัวแปร เช่น <code>process.env.DATABASE_URL</code> แทน</li>
            <li><strong>โค้ดที่ "รันผ่าน" ยังต้องตรวจ Edge Cases และสิทธิ์เสมอ:</strong> AI มักเขียนโค้ดให้ผ่านกรณีปกติ (Happy Path) ก่อน แต่มักลืมดักค่าว่าง (<code>null/undefined</code>) หรือลืมเช็กสิทธิ์ผู้ใช้ฝั่ง Backend</li>
            <li><strong>แบ่งงานใหญ่เป็น PR / Commit ย่อยเสมอ:</strong> สั่งให้ AI แก้ไขทีละฟังก์ชันหรือทีละไฟล์ย่อย แล้วรันทดสอบและ <code>git commit</code> เก็บเป็นระยะ</li>
          </ol>
          <div class="note"><strong>เกร็ดความรู้:</strong> บทนี้เน้น <strong>ขั้นตอนปฏิบัติในโปรเจกต์โค้ดจริง</strong> หากต้องการศึกษาภาพรวมการเปลี่ยนผ่านสู่ยุค AI Coding และความเสี่ยงด้านความปลอดภัย สามารถอ่านต่อได้ในบทความ <a href="/articles/when-human-language-becomes-programming-language">เมื่อภาษามนุษย์กลายเป็นภาษาโปรแกรมในยุค AI Coding</a> <em>(สอดคล้องกับคลิปที่ 1 และ 2 ด้านล่าง)</em></div>`
      },
      {
        id: 'prompt-without-hallucination',
        h: '2. เทคนิคเขียน Prompt สั่งแก้บั๊ก (Debugging) และรีวิวโค้ดระดับฟังก์ชันแบบไม่หลอน',
        html: `
          <p>สาเหตุหลักที่ AI "หลอน" (แต่งโค้ดหรือเดาโครงสร้างขึ้นมาเอง) คือเราให้ข้อมูลทางเทคนิคตั้งต้นน้อยเกินไป ในงานวิศวกรรมซอฟต์แวร์ เราต้องแนบ <strong>โค้ดจริง + ข้อความ Error (Stack Trace) + ขอบเขตที่ห้ามแก้</strong> เสมอ:</p>
          <table>
            <tr><th>คำสั่งกว้างๆ ที่ทำให้ AI เดาและหลอนง่าย</th><th>คำสั่งเชิงวิศวกรรมที่ระบุบริบทและขอบเขตชัดเจน</th></tr>
            <tr><td>"ช่วยเช็กโค้ดนี้ให้หน่อยว่ามีบั๊กไหม"</td><td>"ช่วยรีวิวฟังก์ชัน <code>createOrder</code> ด้านล่างใน 3 ประเด็น: 1) กรณีที่สินค้าหมดสต็อก 2) โอกาสเกิด SQL Injection 3) กรณีที่ข้อมูลราคาเป็นค่าติดลบ โดยไม่ต้องแก้ส่วนอื่นนอกเหนือจากนี้"</td></tr>
          </table>
          <pre><code>// โครงสร้าง Prompt สำหรับสั่ง AI แก้บั๊กจาก Stack Trace จริง
[บริบทเทคโนโลยี]: Next.js 15 (App Router), TypeScript, Prisma ORM
[อาการที่พบ]: กดบันทึกคำสั่งซื้อแล้วได้ HTTP 500
[Stack Trace]:
TypeError: Cannot read properties of undefined (reading 'price')
    at calculateTotal (src/lib/order.ts:42:18)
[โค้ดที่เกี่ยวข้อง]: (แนบฟังก์ชัน calculateTotal บรรทัดที่ 30-55)
[คำสั่ง]: ช่วยชี้สาเหตุว่าทำไมตัวแปรถึงเป็น undefined และเสนอวิธีแก้โดยใช้เฉพาะไลบรารีที่มีใน package.json เท่านั้น</code></pre>
          <ul>
            <li><strong>แนบ Stack Trace และเลขบรรทัดเสมอ:</strong> อย่าเล่าอาการด้วยคำพูดลอยๆ ให้ก๊อปปี้ข้อความ Error จาก Terminal หรือ Browser Console ส่งให้ดูตรงๆ</li>
            <li><strong>กำหนดสิ่งที่ห้ามทำ (Technical Constraints):</strong> เช่น <em>"ใช้เฉพาะไลบรารีที่มีใน package.json เท่านั้น ห้ามลงแพ็กเกจเพิ่ม และห้ามเปลี่ยนชื่อพารามิเตอร์เดิม"</em></li>
            <li><strong>สั่งให้ชี้จุดผิดก่อนลงมือแก้:</strong> ให้ AI อธิบายก่อนว่าปัญหาเกิดจากบรรทัดไหนและเพราะอะไร เพื่อที่เราจะได้ตรวจว่าสมเหตุสมผลไหมก่อนให้มันแก้โค้ด <em>(ดูเทคนิคเพิ่มเติมในคลิปที่ 3)</em></li>
          </ul>`
      },
      {
        id: 'ai-coding-agents',
        h: '3. การจัดโครงสร้างไฟล์ Spec (context.md, Design.md, backlog.md) สำหรับ AI Coding Agent',
        html: `
          <p>ปัจจุบันเครื่องมือช่วยเขียนโค้ดพัฒนาสู่รูปแบบ <strong>AI Coding Agent</strong> (เช่น Claude Code, Cursor, GitHub Copilot Agent) ที่สามารถอ่านโครงสร้างโปรเจกต์ ค้นหาไฟล์ แก้ไขโค้ด และรันคำสั่งทดสอบใน Terminal ร่วมกับเราได้โดยตรง</p>
          <div class="flow"><span>เขียนไฟล์ Spec ใน Repo</span><i>→</i><span>ให้ Agent อ่านบริบทโปรเจกต์</span><i>→</i><span>แบ่งทำทีละงานย่อย</span><i>→</i><span>ตรวจ git diff &amp; รัน Test</span><i>→</i><span>Commit เก็บงาน</span></div>
          <p>เมื่อใช้เครื่องมือระดับ Agent ที่แก้ไขได้หลายไฟล์พร้อมกัน เทคนิคที่นักพัฒนามืออาชีพใช้ควบคุมทิศทาง AI คือการวางไฟล์เอกสารสั้นๆ ไว้ในโฟลเดอร์โปรเจกต์:</p>
          <ul>
            <li><code>context.md</code> (หรือ <code>CLAUDE.md</code>) — บอกภาพรวมสถาปัตยกรรม เทคโนโลยีที่ใช้ คำสั่งรันทดสอบ และกฎการเขียนโค้ดของโปรเจกต์</li>
            <li><code>Design.md</code> — กำหนดโครงสร้างหน้าจอ ระบบสี และข้อห้ามในการออกแบบ UI</li>
            <li><code>backlog.md</code> — แบ่งงานเป็นข้อย่อยๆ พร้อมเงื่อนไขตรวจรับ เพื่อให้สั่งทำและตรวจงานได้ทีละข้อ <em>(ดูรีวิวการใช้งานจริงได้ในคลิปที่ 4)</em></li>
          </ul>
          <pre><code># ตัวอย่างไฟล์ context.md ที่วางไว้หน้าแรกของโปรเจกต์
## Tech Stack
- Framework: Next.js 15 (App Router) + TypeScript (Strict Mode)
- Styling: Tailwind CSS (ห้ามเขียน Inline Style)
- Database: PostgreSQL + Prisma

## Engineering Rules สำหรับ AI
1. ห้ามติดตั้งแพ็กเกจใหม่ใน package.json โดยไม่ถามก่อน
2. ทุกฟังก์ชันใน src/utils/ ต้องมี Unit Test คู่กันเสมอ
3. ก่อนจบงานต้องรัน npx tsc --noEmit เพื่อเช็ก Type Error ทุกครั้ง</code></pre>`
      }
    ],
    quiz: [
      { q: 'วิธีใดช่วยลดอาการ "หลอน" (Hallucination) เวลาสั่งให้ AI เขียนหรือรีวิวโค้ดได้ดีที่สุด', options: ['พิมพ์คำสั่งสั้นๆ แค่บรรทัดเดียว', 'แนบโค้ดที่เกี่ยวข้อง ระบุเทคโนโลยีที่ใช้ และกำหนดขอบเขตสิ่งที่ต้องตรวจให้ชัดเจน', 'สั่งให้ทำทั้งระบบในครั้งเดียว'], answer: 1, explain: 'การให้บริบทโค้ดจริงและกำหนดขอบเขตที่ชัดเจนช่วยให้โมเดลไม่ต้องเดาโครงสร้างหรือแต่งฟังก์ชันขึ้นมาเอง' },
      { q: 'เมื่อใช้ AI Coding Agent แก้ไขโค้ดในโปรเจกต์ ขั้นตอนใดสำคัญที่สุดก่อนกด Commit', options: ['กดยอมรับทุกไฟล์ทันทีโดยไม่ต้องเปิดดู', 'เปิดดู git diff และรันทดสอบเพื่อให้มั่นใจว่าเข้าใจโค้ดที่ถูกแก้ทุกบรรทัด', 'ลบประวัติ Git เดิมทิ้ง'], answer: 1, explain: 'นักพัฒนาต้องตรวจสอบความเปลี่ยนแปลง (git diff) และทดสอบการทำงานจริงเสมอ เพราะเราเป็นผู้รับผิดชอบต่อระบบ' },
      { q: 'อาการ AI Hallucination ในงานเขียนโปรแกรมมีลักษณะอย่างไร', options: ['AI ปฏิเสธการตอบคำถามทุกชนิด', 'AI แต่งชื่อฟังก์ชันหรือเรียกใช้ไลบรารีที่ไม่มีอยู่จริงด้วยน้ำเสียงมั่นใจ', 'คอมพิวเตอร์เครื่องร้อนขึ้นผิดปกติ'], answer: 1, explain: 'Hallucination คือการที่โมเดลสร้างข้อมูลหรือโค้ดที่ดูสมจริงแต่ไม่มีอยู่จริงหรือทำงานไม่ได้ตามที่อ้าง' },
      { q: 'ข้อมูลใดต่อไปนี้ "ห้าม" ก๊อปปี้ส่งเข้าไปใน Prompt ของแชท AI สาธารณะโดยเด็ดขาด', options: ['ข้อความ Error จากการคอมไพล์ TypeScript', 'API Key, รหัสผ่านฐานข้อมูล และข้อมูลส่วนบุคคลของลูกค้าจริง', 'โครงสร้างตารางสมมติสำหรับฝึกเรียน'], answer: 1, explain: 'ความลับของระบบ (Secrets/Keys) และข้อมูลลูกค้าจริงต้องไม่ถูกส่งออกไปภายนอกเพื่อป้องกันข้อมูลรั่วไหล' },
      { q: 'ทำไมการแบ่งงานใหญ่เป็นงานย่อยๆ (Small Tasks) จึงได้ผลลัพธ์จาก AI ดีกว่าการสั่งสร้างทั้งระบบในประโยคเดียว', options: ['เพราะควบคุมขอบเขตได้แม่นยำ ทดสอบความถูกต้องได้ทีละส่วน และไม่ทำให้บริบท (Context) ล้น', 'เพราะ AI อ่านภาษาไทยได้เฉพาะประโยคสั้นๆ', 'เพื่อประหยัดค่าไฟหน้าจอ'], answer: 0, explain: 'การสั่งทำทีละชิ้นย่อยช่วยลดความซับซ้อนและทำให้นักพัฒนาตรวจสอบความถูกต้องได้ทุกขั้นตอน' },
      { q: 'หากโค้ดที่ AI เขียนให้สามารถรันผ่านโดยไม่ขึ้น Error แปลว่าโค้ดนั้นพร้อมขึ้น Production ทันทีหรือไม่', options: ['พร้อมทันทีเพราะไม่มี Syntax Error แล้ว', 'ยังไม่พร้อม ต้องตรวจสอบช่องโหว่ความปลอดภัย กรณีขอบเขต (Edge Cases) และการตรวจสิทธิ์ผู้ใช้ก่อนเสมอ', 'พร้อมถ้าโค้ดมีความยาวไม่เกิน 50 บรรทัด'], answer: 1, explain: 'โค้ดที่รันผ่านอาจยังมีช่องโหว่ร้ายแรง เช่น ลืมเช็กสิทธิ์ผู้ใช้หรือมีช่องโหว่ SQL Injection' },
      { q: 'การกำหนด Constraints (ข้อจำกัด/ข้อห้าม) ใน Prompt เช่น "ใช้เฉพาะไลบรารีที่มีใน package.json เท่านั้น" มีประโยชน์อย่างไร', options: ['ป้องกันไม่ให้ AI แนะนำหรือเรียกใช้แพ็กเกจแปลกๆ ที่ไม่ได้ติดตั้งไว้ในโปรเจกต์', 'ทำให้ AI ตอบเป็นภาษาอังกฤษเท่านั้น', 'ทำให้ขนาดไฟล์เล็กลงครึ่งหนึ่ง'], answer: 0, explain: 'การระบุข้อจำกัดช่วยให้โค้ดที่ AI สร้างขึ้นเข้ากันได้กับสภาพแวดล้อมจริงของโปรเจกต์ทันที' },
      { q: 'เมื่อพบ Bug ในระบบ วิธีสั่ง AI เพื่อช่วยหาสาเหตุที่มีประสิทธิภาพที่สุดคือข้อใด', options: ['พิมพ์แค่ว่า "เว็บพัง ช่วยแก้หน่อย"', 'แนบข้อความ Error เต็มๆ (Stack Trace) พร้อมโค้ดฟังก์ชันที่เกี่ยวข้อง และให้ AI วิเคราะห์สาเหตุก่อนลงมือแก้', 'สั่งให้ AI เขียนโปรเจกต์ใหม่ทั้งหมด'], answer: 1, explain: 'Stack Trace และโค้ดส่วนที่เกิดปัญหาคือหลักฐานสำคัญที่ช่วยให้วิเคราะห์ต้นตอได้ตรงจุดโดยไม่ต้องเดา' },
      { q: 'เครื่องมือประเภท AI Coding Agent แตกต่างจากหน้าเว็บแชท AI ทั่วไปอย่างไร', options: ['สามารถอ่านไฟล์ในโปรเจกต์ แก้ไขหลายไฟล์ และรันคำสั่งทดสอบในสภาพแวดล้อมของโปรเจกต์ร่วมกับนักพัฒนาได้โดยตรง', 'ไม่ต้องใช้ไฟฟ้าในการทำงาน', 'ไม่มีโอกาสเขียนโค้ดผิดเลย 100%'], answer: 0, explain: 'AI Coding Agent เชื่อมต่อกับไฟล์โปรเจกต์และ Terminal ทำให้เข้าถึงบริบทจริงและช่วยทำงานแบบครบวงจรได้' },
      { q: 'การเตรียมไฟล์เอกสารสั้นๆ เช่น context.md, Design.md และ backlog.md ไว้ในโปรเจกต์ช่วย AI Coding Agent อย่างไร', options: ['ช่วยให้ Agent เข้าใจเป้าหมาย มาตรฐานการออกแบบ และลำดับงานของโปรเจกต์โดยไม่ต้องพิมพ์อธิบายซ้ำทุกครั้ง', 'ทำให้เบราว์เซอร์โหลดรูปภาพเร็วขึ้น', 'ใช้แทนฐานข้อมูลของระบบ'], answer: 0, explain: 'เอกสาร Spec ทำหน้าที่เป็นแหล่งอ้างอิงกลางให้ทั้งคนในทีมและ AI ทำงานไปในทิศทางเดียวกัน' }
    ]
  },

  /* ======================= INTERMEDIATE ======================= */
  {
    id: 'modern-frontend',
    no: 5,
    level: 'intermediate',
    category: 'Frontend',
    keyword: 'REACT',
    subtitle: 'HTML5, React & Next.js',
    tagline: 'พื้นฐาน HTML5 สู่ Component, State และ Next.js',
    title: 'Frontend สมัยใหม่ (HTML/CSS/JS & State ใน React/Next.js)',
    summary: 'ปูพื้นฐานโครงสร้าง HTML5, ทำความเข้าใจ React ใน 3 นาที, การสร้างโปรเจกต์ด้วย Vite และการเลือกระหว่าง React กับ Next.js',
    why: 'AI สร้างโค้ดหน้าเว็บ React/Next.js ได้เร็วมาก แต่ถ้าเราไม่รู้ว่า Component แบ่งอย่างไร หรือเมื่อไหร่ควรใช้ React เดี่ยวๆ เทียบกับ Next.js โค้ดหน้าบ้านจะซับซ้อนเกินจำเป็น',
    minutes: 16,
    topics: ['HTML5 พื้นฐาน', 'React Component & State', 'สร้างโปรเจกต์ด้วย Vite', 'React vs Next.js'],
    sections: [
      {
        id: 'html5-foundation',
        h: '1. พื้นฐานการเขียนเว็บด้วย HTML5 (จุดเริ่มต้นของทุกหน้าเว็บ)',
        html: `
          <p>ไม่ว่าเว็บจะใช้ Framework ล้ำแค่ไหน สุดท้ายผลลัพธ์ที่ส่งไปให้เบราว์เซอร์แสดงผลก็คือ <strong>HTML5, CSS และ JavaScript</strong> เสมอ</p>
          <ul>
            <li><strong>Semantic HTML5:</strong> การเลือกใช้แท็กให้ตรงความหมาย เช่น <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;button&gt;</code> ช่วยให้ทั้งคนอ่านโค้ด เครื่องมือค้นหา (SEO) และผู้พิการที่ใช้ Screen Reader เข้าใจโครงสร้างหน้าเว็บได้ทันที</li>
            <li><strong>CSS Flexbox &amp; Grid:</strong> จัดวางองค์ประกอบให้อยู่ในแถวหรือคอลัมน์ที่ยืดหยุ่นตามขนาดหน้าจอมือถือและคอมพิวเตอร์ <em>(ดูพื้นฐาน HTML5 ได้ในคลิปที่ 4)</em></li>
          </ul>`
      },
      {
        id: 'react-in-180s',
        h: '2. ทำความรู้จัก React: แนวคิด Component และ State',
        html: `
          <p><strong>React</strong> คือไลบรารี JavaScript สำหรับสร้างส่วนติดต่อผู้ใช้ (UI) ที่เปลี่ยนวิธีคิดจากการเขียนหน้าเว็บยาวๆ ไฟล์เดียว มาเป็นการประกอบชิ้นส่วนย่อยที่เรียกว่า <strong>Component</strong></p>
          <pre><code>import { useState } from 'react';

export function CounterButton() {
  const [count, setCount] = useState(0); // State เก็บค่าที่เปลี่ยนแปลงได้
  return (
    &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
      กดแล้ว {count} ครั้ง
    &lt;/button&gt;
  );
}</code></pre>
          <ul>
            <li><strong>Component:</strong> ฟังก์ชันที่คืนค่าเป็นหน้าตา UI นำกลับมาใช้ซ้ำได้หลายจุด</li>
            <li><strong>Props:</strong> ข้อมูลที่ส่งจาก Component แม่ลงไปให้ลูก</li>
            <li><strong>State (<code>useState</code>):</strong> ข้อมูลภายในที่เมื่อค่าเปลี่ยน React จะทำการวาดหน้าจอเฉพาะส่วนนั้นใหม่ให้อัตโนมัติ <em>(สรุปจบไวในคลิปที่ 1)</em></li>
          </ul>`
      },
      {
        id: 'starting-react-vite',
        h: '3. เริ่มต้นสร้างโปรเจกต์ React สำหรับผู้เริ่มต้น (ด้วย Vite)',
        html: `
          <p>เวลาเริ่มต้นฝึกเขียน React แบบหน้าเดียว (Single-Page Application — SPA) เครื่องมือที่นิยมใช้สร้างโปรเจกต์คือ <strong>Vite</strong> เพราะรันขึ้นหน้าจอได้เร็วมาก:</p>
          <pre><code>npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev</code></pre>
          <p>โครงสร้างที่ได้จะมีไฟล์หลักอยู่ที่ <code>src/App.tsx</code> ซึ่งเราสามารถแก้ไขโค้ดแล้วเห็นผลลัพธ์บนเบราว์เซอร์ทันที <em>(ดูขั้นตอนการสร้างจริงได้ในคลิปที่ 2)</em></p>`
      },
      {
        id: 'react-vs-nextjs',
        h: '4. เลือกอะไรดี? React (Vite) กับ Next.js ตัวไหนเหมาะกับเราที่สุด',
        html: `
          <p>คำถามยอดฮิตของคนทำเว็บยุคนี้คือ ควรใช้ React เพียวๆ (ผ่าน Vite) หรือใช้ <strong>Next.js</strong> ที่ครอบทับ React อีกชั้นดี?</p>
          <table>
            <tr><th>หัวข้อเปรียบเทียบ</th><th>React (เช่น สร้างด้วย Vite)</th><th>Next.js (Full-Stack Framework บน React)</th></tr>
            <tr><td><strong>ลักษณะการทำงาน</strong></td><td>ทำงานฝั่งเบราว์เซอร์เป็นหลัก (Client-Side Rendering)</td><td>รองรับทั้งการเตรียมหน้าเว็บจากฝั่ง Server (SSR / SSG) และฝั่ง Client</td></tr>
            <tr><td><strong>การแยกหน้าเพจ (Routing)</strong></td><td>ต้องลงไลบรารีเสริมเอง (เช่น React Router)</td><td>มีระบบแยกหน้าตามโฟลเดอร์ให้ทันที (App Router เช่น <code>src/app/roadmap/page.tsx</code>)</td></tr>
            <tr><td><strong>การติดอันดับ Google (SEO)</strong></td><td>ไม่เด่น เพราะไฟล์เริ่มต้นเป็นหน้าว่างก่อน JS จะรัน</td><td>ดีมาก เพราะส่งเนื้อหา HTML ที่พร้อมอ่านมาจาก Server ทันที</td></tr>
            <tr><td><strong>เหมาะกับงานแบบไหน</strong></td><td>ระบบ Dashboard หลังบ้าน, แอปที่ต้องล็อกอินก่อนใช้งาน</td><td>เว็บไซต์ทั่วไป, เว็บบทความ/การเรียนรู้ (เช่นเว็บ LernWeb นี้), ระบบ E-Commerce</td></tr>
          </table>
          <div class="note">สรุปสั้นๆ: หัดเข้าใจพื้นฐานจาก <strong>React</strong> ให้รู้เรื่อง Component &amp; State ก่อน แล้วต่อยอดมาใช้ <strong>Next.js</strong> เมื่อต้องการทำเว็บที่มีหลายหน้าและใช้งานจริงครบวงจร <em>(ดูการเปรียบเทียบในคลิปที่ 3)</em></div>`
      }
    ],
    quiz: [
      { q: 'เมื่อข้อมูลใน State (useState) ของ React เปลี่ยนแปลง จะเกิดอะไรขึ้น', options: ['ต้องกด Refresh เบราว์เซอร์เองทุกครั้ง', 'React จะอัปเดตหน้าจอเฉพาะส่วนที่ใช้ State นั้นให้อัตโนมัติ', 'ข้อมูลในฐานข้อมูลจะถูกลบ'], answer: 1, explain: 'React ติดตามการเปลี่ยนแปลงของ State และทำการ Re-render ส่วนแสดงผลให้ตรงกับข้อมูลล่าสุดโดยอัตโนมัติ' },
      { q: 'ถ้าต้องการทำเว็บไซต์บทความที่เน้นให้ติดผลการค้นหาบน Google (SEO) และมีระบบแยกหน้าเพจในตัว ควรเลือกใช้อะไร', options: ['Next.js', 'เขียนแค่ไฟล์ CSS อย่างเดียว', 'ใช้เฉพาะฐานข้อมูลโดยไม่มี Frontend'], answer: 0, explain: 'Next.js รองรับการเรนเดอร์เนื้อหาจากฝั่ง Server (SSR/SSG) ทำให้ Search Engine อ่านเนื้อหาได้ครบถ้วนและมีระบบ Routing มาให้ในตัว' },
      { q: 'การใช้ Semantic HTML5 (เช่น <header>, <nav>, <main>, <article>) มีประโยชน์หลักอย่างไร', options: ['ช่วยให้โครงสร้างโค้ดมีความหมายชัดเจน ดีต่อทั้ง SEO, Screen Reader และการดูแลรักษาโค้ด', 'ทำให้ไม่ต้องเขียน CSS อีกต่อไป', 'ทำให้เว็บไซต์ไม่ต้องใช้เซิร์ฟเวอร์'], answer: 0, explain: 'แท็ก Semantic บอกความหมายของแต่ละส่วนบนหน้าเว็บ ช่วยให้ทั้งคนอ่านโค้ดและ Search Engine เข้าใจโครงสร้างได้ทันที' },
      { q: 'แนวคิดเรื่อง Component ใน React ช่วยแก้ปัญหาในการทำหน้าเว็บอย่างไร', options: ['ช่วยแยกส่วนติดต่อผู้ใช้ (UI) ออกเป็นชิ้นย่อยที่นำกลับมาใช้ซ้ำและแก้ไขแยกส่วนได้ง่าย', 'ทำให้ไม่ต้องใช้ภาษา JavaScript', 'บังคับให้ทั้งเว็บต้องเขียนอยู่ในบรรทัดเดียว'], answer: 0, explain: 'Component ช่วยแบ่ง UI ที่ซับซ้อนออกเป็นชิ้นส่วนอิสระ เช่น ปุ่ม การ์ด หรือแถบเมนู ที่นำมาประกอบรวมกันได้' },
      { q: 'ใน React ข้อมูลที่ส่งจาก Component แม่ (Parent) ลงไปยัง Component ลูก (Child) เรียกว่าอะไร', options: ['Props', 'SQL', 'Router'], answer: 0, explain: 'Props (Properties) คือพารามิเตอร์ที่ส่งจาก Component แม่ลงไปให้ Component ลูกใช้งาน' },
      { q: 'เครื่องมือ Vite นิยมนำมาใช้ทำอะไรในการพัฒนา Frontend ยุคใหม่', options: ['ใช้สร้างและรันโปรเจกต์ React แบบ Single-Page Application (SPA) ที่เปิดเซิร์ฟเวอร์พัฒนาได้รวดเร็วมาก', 'ใช้แทนระบบจัดการฐานข้อมูล PostgreSQL', 'ใช้ออกแบบโลโก้สามมิติ'], answer: 0, explain: 'Vite เป็น Build Tool และ Dev Server สมัยใหม่ที่ช่วยให้เริ่มต้นโปรเจกต์ React/TypeScript ได้อย่างรวดเร็ว' },
      { q: 'ใน Next.js (App Router) การสร้างหน้าเว็บใหม่ที่ URL /roadmap ต้องสร้างไฟล์ไว้ที่ตำแหน่งใด', options: ['src/app/roadmap/page.tsx', 'public/images/roadmap.png', 'package.json'], answer: 0, explain: 'Next.js App Router ใช้โครงสร้างโฟลเดอร์ภายใต้ src/app/ คู่กับไฟล์ page.tsx ในการกำหนดเส้นทางหน้าเว็บ (File-system Routing)' },
      { q: 'ข้อใดคือความแตกต่างสำคัญระหว่าง Client-Side Rendering (CSR) กับ Server-Side Rendering (SSR)', options: ['CSR ส่งไฟล์ JS ไปวาดหน้าเว็บที่เบราว์เซอร์ของผู้ใช้ ส่วน SSR เตรียมเนื้อหา HTML ที่พร้อมแสดงผลมาจากฝั่ง Server', 'CSR ใช้ได้เฉพาะบนมือถือ ส่วน SSR ใช้ได้เฉพาะบนคอมพิวเตอร์', 'ไม่แตกต่างกันเลย'], answer: 0, explain: 'SSR ช่วยให้ผู้ใช้เห็นเนื้อหาทันทีและช่วยให้บอทของ Search Engine อ่านข้อมูลหน้าเว็บได้ครบถ้วน' },
      { q: 'ระบบ CSS Layout แบบใดที่เหมาะกับการจัดเรียงการ์ดบทความหลายๆ ใบให้แบ่งเป็นแถวและคอลัมน์อัตโนมัติ', options: ['CSS Grid / Flexbox', 'HTML <marquee>', 'SQL JOIN'], answer: 0, explain: 'CSS Grid และ Flexbox เป็นเครื่องมือมาตรฐานในการจัดวางโครงสร้างหน้าเว็บให้ยืดหยุ่นตามขนาดหน้าจอ (Responsive)' },
      { q: 'หากสร้างตัวแปรธรรมดาด้วย let count = 0; แล้วเปลี่ยนค่าเมื่อกดปุ่มโดยไม่ใช้ useState ทำไมตัวเลขบนหน้าจอของ React จึงไม่เปลี่ยนตาม', options: ['เพราะตัวแปรธรรมดาไม่ได้แจ้งเตือนให้ React ทำการวาดหน้าจอใหม่ (Re-render) เหมือนการใช้ State', 'เพราะ JavaScript บวกเลขไม่ได้', 'เพราะต้องรีสตาร์ทคอมพิวเตอร์ก่อน'], answer: 0, explain: 'React จะทำการ Re-render หน้าจอใหม่เมื่อมีการเรียกฟังก์ชันอัปเดต State (เช่น setCount) เท่านั้น' }
    ]
  },

  {
    id: 'backend-api',
    no: 6,
    level: 'intermediate',
    category: 'Backend',
    keyword: 'API',
    subtitle: 'Backend, REST API & Swagger',
    tagline: 'API คืออะไร ทำงานอย่างไร และทำเอกสารให้คนอื่นใช้งาน',
    title: 'Backend และการออกแบบ API (RESTful API & Documentation)',
    summary: 'ทำความเข้าใจว่า API คืออะไรด้วยภาษาง่ายๆ, หลักการทำงานรับ-ส่งข้อมูลของ REST API และการทำเอกสาร API ด้วย Swagger ให้ทีมอื่นเชื่อมต่อได้ทันที',
    why: 'ระบบหน้าบ้าน (เว็บ/แอปมือถือ) กับระบบหลังบ้านและบริการภายนอกคุยกันผ่าน API ทั้งหมด ถ้าออกแบบ API ไม่เป็นระบบ การเชื่อมต่อทั้งโปรเจกต์จะพังง่ายมาก',
    minutes: 16,
    topics: ['API 101 คืออะไร', 'หลักการทำงานของ API', 'RESTful API Design', 'Swagger / OpenAPI'],
    sections: [
      {
        id: 'what-is-api-101',
        h: '1. API 101: API คืออะไร อธิบายแบบเห็นภาพในชีวิตประจำวัน',
        html: `
          <p><strong>API (Application Programming Interface)</strong> คือ <strong>"ช่องทางและข้อตกลงในการสื่อสารระหว่างซอฟต์แวร์ 2 ระบบ"</strong></p>
          <p>เปรียบเทียบให้เห็นภาพง่ายที่สุดเหมือนเวลาเราไปร้านอาหาร:</p>
          <div class="flow"><span>ลูกค้า (Frontend / แอปมือถือ)</span><i>→</i><span>พนักงานรับออเดอร์ (API)</span><i>→</i><span>ห้องครัว (Backend &amp; Database)</span><i>→</i><span>เสิร์ฟอาหารกลับไปที่โต๊ะ (Response)</span></div>
          <ul>
            <li>ลูกค้าไม่จำเป็นต้องเดินเข้าครัวไปผัดข้าวเอง (หน้าเว็บไม่ควรต่อเข้าฐานข้อมูลตรงๆ)</li>
            <li>แค่สั่งตามเมนูที่ร้านกำหนดไว้ พนักงาน (API) ก็จะนำคำสั่งไปให้ห้องครัวทำ แล้วถือจานอาหารกลับมาส่งให้ <em>(ดูคำอธิบายสนุกๆ ได้ในคลิปที่ 1 และ 2)</em></li>
          </ul>`
      },
      {
        id: 'how-api-works',
        h: '2. หลักการทำงานของ API แบบง่ายๆ (Request & JSON Response)',
        html: `
          <p>ในการทำงานจริงของเว็บแอปพลิเคชัน เมื่อผู้ใช้กดปุ่มบนหน้าเว็บ โค้ดฝั่ง Frontend จะส่งคำขอไปยัง URL ของ API (เรียกว่า <strong>Endpoint</strong>) และรับข้อมูลกลับมาในรูปแบบ <strong>JSON</strong> ซึ่งเป็นรูปแบบข้อความที่ทุกภาษาโปรแกรมอ่านเข้าใจตรงกัน:</p>
          <pre><code>// 1. ฝั่งหน้าบ้านเรียกขอข้อมูลบทเรียนที่ 6
GET /api/lessons/6

// 2. ฝั่งหลังบ้านตอบกลับเป็นข้อมูล JSON (Status 200 OK)
{
  "id": "backend-api",
  "no": 6,
  "title": "Backend และการออกแบบ API",
  "minutes": 16
}</code></pre>
          <p>ข้อดีของการแยก Frontend กับ Backend ออกจากกันแล้วคุยผ่าน API คือ เราเขียน Backend แค่ชุดเดียว แต่สามารถนำไปใช้กับทั้ง <strong>หน้าเว็บ, แอป iOS และแอป Android</strong> ได้พร้อมกัน <em>(ดูการทำงานได้ในคลิปที่ 3)</em></p>`
      },
      {
        id: 'restful-design',
        h: '3. การออกแบบ RESTful API ที่ดีและปลอดภัย',
        html: `
          <table>
            <tr><th>HTTP Method</th><th>URL Endpoint</th><th>หน้าที่การทำงาน</th></tr>
            <tr><td><code>GET</code></td><td><code>/api/users</code></td><td>ดึงรายการผู้ใช้ทั้งหมด</td></tr>
            <tr><td><code>GET</code></td><td><code>/api/users/42</code></td><td>ดึงข้อมูลของผู้ใช้รหัส 42</td></tr>
            <tr><td><code>POST</code></td><td><code>/api/users</code></td><td>สร้างผู้ใช้ใหม่ (ส่งข้อมูลมาใน Body)</td></tr>
            <tr><td><code>PUT / PATCH</code></td><td><code>/api/users/42</code></td><td>แก้ไขข้อมูลของผู้ใช้รหัส 42</td></tr>
            <tr><td><code>DELETE</code></td><td><code>/api/users/42</code></td><td>ลบผู้ใช้รหัส 42</td></tr>
          </table>
          <div class="note note--warn"><strong>กฎเหล็กของคนทำ Backend:</strong> ตรวจสอบความถูกต้องของข้อมูลขาเข้า (Input Validation) และตรวจสิทธิ์ผู้ใช้ (Authentication &amp; Authorization) ทุกครั้งที่ถูกเรียก API ห้ามไว้ใจว่าข้อมูลที่ส่งมาจะปลอดภัยเสมอ</div>`
      },
      {
        id: 'swagger-openapi',
        h: '4. สร้าง API แล้วอยากให้คนอื่นใช้ ต้องทำอย่างไร? (รู้จัก Swagger / OpenAPI)',
        html: `
          <p>ปัญหาคลาสสิกในการทำงานเป็นทีมคือ <strong>"คนทำ Backend สร้าง API เสร็จแล้ว แต่คนทำ Frontend ไม่รู้ว่าต้องเรียก URL ไหน ต้องส่งตัวแปรชื่ออะไรไปบ้าง"</strong></p>
          <p>ทางออกมาตรฐานที่ใช้กันทั่วโลกคือการทำ <strong>API Documentation ด้วย Swagger (OpenAPI)</strong>:</p>
          <ul>
            <li><strong>สร้างหน้าเว็บคู่มือ API อัตโนมัติ:</strong> แสดงรายการ Endpoint ทั้งหมดว่ามี <code>GET</code>, <code>POST</code> อะไรบ้าง</li>
            <li><strong>บอกโครงสร้างข้อมูลชัดเจน:</strong> ระบุว่าต้องส่งพารามิเตอร์ตัวไหนเป็นตัวเลขหรือข้อความ และจะได้ JSON หน้าตาแบบไหนกลับมา</li>
            <li><strong>มีปุ่ม Try it out ให้กดยิงทดสอบบนหน้าเว็บได้ทันที:</strong> คนทำ Frontend หรือแม้แต่ AI Coding Agent สามารถอ่านไฟล์สเปกของ Swagger แล้วเขียนโค้ดเชื่อมต่อได้อย่างแม่นยำโดยไม่ต้องเดา <em>(ดูวิธีทำได้ในคลิปที่ 4)</em></li>
          </ul>`
      }
    ],
    quiz: [
      { q: 'ข้อใดคือประโยชน์หลักของการใช้ API คั่นกลางระหว่าง Frontend กับ Database', options: ['ทำให้หน้าเว็บเปลี่ยนสีได้เอง', 'ช่วยควบคุมความปลอดภัย ตรวจสอบสิทธิ์ และใช้ Backend ชุดเดียวร่วมกันได้ทั้งเว็บและแอปมือถือ', 'ทำให้ไม่ต้องมีเซิร์ฟเวอร์'], answer: 1, explain: 'API ทำหน้าที่เป็นตัวกลางตรวจสอบความปลอดภัยและส่งข้อมูลมาตรฐาน (เช่น JSON) ให้แพลตฟอร์มต่างๆ ใช้งานร่วมกันได้' },
      { q: 'เครื่องมือ Swagger (OpenAPI) ช่วยแก้ปัญหาใดในการทำงานร่วมกันของทีมพัฒนา', options: ['ช่วยสร้างหน้าคู่มือและสเปกของ API พร้อมให้กดทดสอบเรียกใช้งานได้ทันที', 'ช่วยแต่งรูปภาพแบนเนอร์', 'ใช้แทนระบบปฏิบัติการ Windows'], answer: 0, explain: 'Swagger ช่วยสร้างเอกสาร API ที่บอก Endpoint, ข้อมูลขาเข้า/ขาออก และมีหน้าเว็บให้ทดสอบยิง API ได้ทันที' },
      { q: 'คำว่า API ย่อมาจากอะไร', options: ['Application Programming Interface', 'Automated Processor Internet', 'Advanced Pixel Image'], answer: 0, explain: 'API ย่อมาจาก Application Programming Interface คือช่องทางและข้อตกลงในการสื่อสารระหว่างซอฟต์แวร์' },
      { q: 'หากเปรียบเทียบระบบเว็บกับร้านอาหาร ส่วนของ API ทำหน้าที่เหมือนใครในร้าน', options: ['พนักงานรับออเดอร์ที่นำคำสั่งจากโต๊ะลูกค้าไปส่งห้องครัวแล้วเสิร์ฟอาหารกลับมา', 'โต๊ะและเก้าอี้ในร้าน', 'ป้ายชื่อร้านหน้าตึก'], answer: 0, explain: 'API เป็นตัวกลางรับคำขอจากผู้ใช้ (Frontend) ไปประมวลผลที่หลังบ้าน (Backend/Database) แล้วส่งผลลัพธ์กลับไป' },
      { q: 'รูปแบบข้อมูลมาตรฐานที่นิยมใช้รับ-ส่งผ่าน REST API มากที่สุดในปัจจุบันคือรูปแบบใด', options: ['JSON (JavaScript Object Notation)', 'ไฟล์ภาพ .BMP', 'ไฟล์เสียง .WAV'], answer: 0, explain: 'JSON มีขนาดเล็ก อ่านง่ายสำหรับมนุษย์ และรองรับการแปลงข้อมูลในทุกภาษาโปรแกรม' },
      { q: 'ในการออกแบบ RESTful API หากต้องการ "ลบข้อมูลผู้ใช้รหัส 42" ควรใช้ Method และ URL ใด', options: ['DELETE /api/users/42', 'GET /api/users/42', 'POST /api/login'], answer: 0, explain: 'HTTP Method DELETE คู่กับ URL ที่ระบุรหัสทรัพยากรชัดเจนเป็นมาตรฐานของ RESTful API สำหรับการลบข้อมูล' },
      { q: 'ทำไมโค้ดฝั่ง Frontend (ที่รันอยู่บนเบราว์เซอร์ของผู้ใช้) จึงไม่ควรเชื่อมต่อฐานข้อมูลหลักโดยตรงโดยไม่มี API หรือกฎควบคุมสิทธิ์', options: ['เพราะผู้ใช้สามารถเปิด DevTools ดูรหัสผ่านฐานข้อมูลและสั่งแก้ไขหรือลบข้อมูลของคนอื่นได้ทั้งหมด', 'เพราะเบราว์เซอร์แสดงตัวอักษรภาษาไทยไม่ได้', 'เพราะจะทำให้เมาส์คลิกไม่ได้'], answer: 0, explain: 'โค้ดทุกอย่างที่ส่งไปรันบนเบราว์เซอร์ถูกเปิดดูได้ การเชื่อมต่อฐานข้อมูลหรือเก็บความลับจึงต้องอยู่ฝั่ง Server/Backend หรือควบคุมผ่าน RLS' },
      { q: 'Input Validation ที่ฝั่ง Backend API มีความสำคัญอย่างไร', options: ['ช่วยตรวจสอบว่าข้อมูลที่ส่งเข้ามาครบถ้วน ถูกชนิดข้อมูล และไม่อันตรายก่อนนำไปประมวลผลหรือบันทึกลงฐานข้อมูล', 'ช่วยเปลี่ยนฟอนต์ของหน้าเว็บ', 'ช่วยเพิ่มความเร็วอินเทอร์เน็ตบ้านของผู้ใช้'], answer: 0, explain: 'แม้หน้าเว็บจะมีการเช็กฟอร์มแล้ว แต่ผู้ไม่หวังดีสามารถยิง API ตรงๆ ข้ามหน้าเว็บได้ Backend จึงต้องตรวจข้อมูลขาเข้าเสมอ' },
      { q: 'หากบริษัทมีทั้งเว็บไซต์, แอป iOS และแอป Android การออกแบบระบบโดยใช้ REST API ชุดเดียวกันมีข้อดีอย่างไร', options: ['เขียนลอจิกหลังบ้านและดูแลความปลอดภัยที่จุดเดียว แต่รองรับหน้าบ้านได้ทุกแพลตฟอร์มพร้อมกัน', 'ต้องเขียนฐานข้อมูลแยกกัน 3 ก้อนที่ไม่คุยกัน', 'ทำให้แอปมือถือไม่ต้องต่ออินเทอร์เน็ต'], answer: 0, explain: 'การแยกส่วน Frontend กับ Backend ผ่าน API ช่วยให้ใช้ระบบหลังบ้านร่วมกันได้ทุกอุปกรณ์' },
      { q: 'ข้อใดคือความแตกต่างระหว่าง Authentication กับ Authorization ในระบบ API', options: ['Authentication คือการยืนยันว่า "คุณคือใคร" (ล็อกอิน) ส่วน Authorization คือการตรวจว่า "คุณมีสิทธิ์ทำสิ่งนี้ไหม"', 'เป็นคำเดียวกันทุกประการ', 'Authentication ใช้กับรูปภาพ ส่วน Authorization ใช้กับวิดีโอ'], answer: 0, explain: 'ล็อกอินผ่านคือ Authentication แต่การเช็กว่าผู้ใช้คนนี้มีสิทธิ์ลบโพสต์หรือเข้าหน้าแอดมินได้หรือไม่คือ Authorization' }
    ]
  },

  {
    id: 'database-systems',
    no: 7,
    level: 'intermediate',
    category: 'Database',
    keyword: 'DB',
    subtitle: 'SQL, NoSQL & SQL Injection',
    tagline: 'ความต่างของ SQL กับ NoSQL และการป้องกันช่องโหว่ฐานข้อมูล',
    title: 'ฐานข้อมูล SQL / NoSQL และช่องโหว่ SQL Injection',
    summary: 'เข้าใจความแตกต่างระหว่างฐานข้อมูลแบบตาราง (SQL) กับแบบยืดหยุ่น (NoSQL) เลือกใช้ให้เหมาะกับงาน และวิธีป้องกัน SQL Injection',
    why: 'ข้อมูลคือทรัพย์สินที่สำคัญที่สุดของระบบ ถ้าเลือกชนิดฐานข้อมูลผิดกับงาน หรือปล่อยให้มีช่องโหว่ SQL Injection ข้อมูลทั้งระบบอาจถูกขโมยหรือถูกลบได้ในคำสั่งเดียว',
    minutes: 15,
    topics: ['SQL (Relational DB)', 'NoSQL คืออะไร', 'SQL vs NoSQL เลือกอย่างไร', 'SQL Injection & วิธีป้องกัน'],
    sections: [
      {
        id: 'sql-vs-nosql-overview',
        h: '1. SQL และ NoSQL แตกต่างกันอย่างไร? เหมาะกับงานแบบไหน?',
        html: `
          <p>ฐานข้อมูลที่ใช้เก็บข้อมูลของแอปพลิเคชันแบ่งออกเป็น 2 ตระกูลใหญ่ๆ ที่มีจุดเด่นต่างกันชัดเจน:</p>
          <table>
            <tr><th>หัวข้อเปรียบเทียบ</th><th>SQL (Relational Database)</th><th>NoSQL (Non-Relational Database)</th></tr>
            <tr><td><strong>รูปแบบการเก็บข้อมูล</strong></td><td>เก็บเป็น <strong>ตาราง (แถวและคอลัมน์)</strong> ที่กำหนดโครงสร้างชัดเจนและเชื่อมโยงกันด้วย Key</td><td>เก็บแบบยืดหยุ่น เช่น เอกสาร JSON (Document), คู่ Key-Value หรือกราฟ</td></tr>
            <tr><td><strong>ตัวอย่างยอดนิยม</strong></td><td>PostgreSQL, MySQL, SQL Server, SQLite</td><td>MongoDB, Redis, Firebase Firestore, DynamoDB</td></tr>
            <tr><td><strong>ความสม่ำเสมอของโครงสร้าง</strong></td><td>ต้องกำหนดคอลัมน์และชนิดข้อมูลให้ชัดเจนก่อนบันทึก</td><td>แต่ละรายการมีฟิลด์ไม่เท่ากันได้ ปรับเปลี่ยนโครงสร้างได้รวดเร็ว</td></tr>
            <tr><td><strong>เหมาะกับลักษณะงานใด</strong></td><td>ระบบการเงิน ระบบสั่งซื้อสินค้า ระบบบัญชี หรือข้อมูลที่มีความสัมพันธ์ซับซ้อนและห้ามผิดพลาด</td><td>ระบบแชท, ฟีดโซเชียล, เก็บ Log จำนวนมหาศาล, หรือทำ Cache ความเร็วสูง (Redis)</td></tr>
          </table>
          <p><em>(ดูการเปรียบเทียบและการเลือกใช้จากงานจริงได้ในคลิปที่ 3)</em></p>`
      },
      {
        id: 'nosql-fast-intro',
        h: '2. รู้จัก NoSQL ฉบับเข้าใจไว: ทำไมยุคนี้ถึงนิยมใช้คู่กับ SQL?',
        html: `
          <p>คำว่า <strong>NoSQL (Not Only SQL)</strong> เกิดขึ้นมาเพื่อรองรับข้อมูลยุคใหม่ที่มีปริมาณมหาศาลและมีโครงสร้างหลากหลาย เช่น ข้อมูลสินค้าแต่ละหมวดหมู่ที่มีคุณสมบัติไม่เหมือนกันเลย:</p>
          <pre><code>// ตัวอย่างการเก็บข้อมูลแบบ Document (JSON) ใน MongoDB
{
  "_id": "prod_101",
  "name": "คีย์บอร์ดไร้สาย",
  "price": 2490,
  "specs": { "switch": "Brown", "layout": "75%" },
  "tags": ["gadget", "keyboard"]
}</code></pre>
          <p>ในระบบขนาดใหญ่มักไม่ได้เลือกแค่อย่างเดียว แต่ใช้ร่วมกัน เช่น ใช้ <strong>PostgreSQL (SQL)</strong> เก็บข้อมูลผู้ใช้และการชำระเงิน แล้วใช้ <strong>Redis (NoSQL แบบ Key-Value)</strong> เก็บข้อมูลที่ถูกดึงบ่อยๆ ไว้ในหน่วยความจำเพื่อให้เว็บตอบสนองเร็วในระดับมิลลิวินาที <em>(ดูสรุปไวในคลิปที่ 1)</em></p>`
      },
      {
        id: 'sql-injection-danger',
        h: '3. SQL Injection: ช่องโหว่สุดอันตรายของสายทำเว็บและวิธีป้องกัน',
        html: `
          <p><strong>SQL Injection (SQLi)</strong> คือช่องโหว่ที่เกิดจากการที่โปรแกรมเมอร์ (หรือ AI ที่เขียนโค้ดให้เรา) <strong>นำข้อความที่ผู้ใช้กรอกมาต่อรวมกับคำสั่ง SQL โดยตรง</strong></p>
          <pre><code>// ❌ โค้ดที่มีช่องโหว่ SQL Injection
const query = "SELECT * FROM users WHERE username = '" + userInput + "'";

// ถ้าผู้ไม่หวังดีกรอกคำว่า:   admin' OR '1'='1
// คำสั่ง SQL จะกลายเป็น:
// SELECT * FROM users WHERE username = 'admin' OR '1'='1'
// ซึ่งเงื่อนไข '1'='1' เป็นจริงเสมอ ทำให้ล็อกอินผ่านโดยไม่ต้องรู้รหัสผ่าน!</code></pre>
          <p><strong>วิธีป้องกันที่ถูกต้อง 100%:</strong> ห้ามเอาตัวแปรมาต่อ String เองเด็ดขาด ให้ใช้ <strong>Parameterized Query (Prepared Statement)</strong> หรือผ่าน ORM มาตรฐานเสมอ เพื่อแยก "ข้อมูลของผู้ใช้" ออกจาก "คำสั่ง SQL":</p>
          <pre><code>// ✅ ปลอดภัย: ส่งค่าผ่านพารามิเตอร์แยกต่างหาก
await db.query('SELECT * FROM users WHERE username = $1', [userInput]);</code></pre>
          <div class="note note--warn">เวลาให้ AI เขียนโค้ดเชื่อมต่อฐานข้อมูล ต้องตรวจดูทุกครั้งว่าใช้ Parameterized Query หรือไม่ เพราะนี่คือจุดที่พลาดกันบ่อยที่สุด <em>(ดูตัวอย่างการโจมตีและการป้องกันได้ในคลิปที่ 2)</em></div>`
      }
    ],
    quiz: [
      { q: 'ระบบโอนเงินและบัญชีธนาคารที่ต้องการความถูกต้องของความสัมพันธ์ข้อมูลสูงสุด ควรเลือกใช้ฐานข้อมูลประเภทใดเป็นหลัก', options: ['SQL (Relational Database เช่น PostgreSQL)', 'เก็บในไฟล์ Text ธรรมดา', 'เก็บไว้ใน LocalStorage ของเบราว์เซอร์เท่านั้น'], answer: 0, explain: 'ฐานข้อมูลตระกูล SQL มีโครงสร้างตารางและระบบ Transaction (ACID) ที่รับประกันความถูกต้องของข้อมูลทางการเงินได้ดีที่สุด' },
      { q: 'สาเหตุหลักที่ทำให้เกิดช่องโหว่ SQL Injection คืออะไร', options: ['ตั้งชื่อตารางเป็นภาษาอังกฤษ', 'นำข้อความที่ผู้ใช้กรอกมาต่อรวม (Concatenate) กับคำสั่ง SQL โดยตรงโดยไม่ใช้ Parameterized Query', 'มีจำนวนข้อมูลในตารางมากเกินไป'], answer: 1, explain: 'การนำ Input ของผู้ใช้มาต่อกับคำสั่ง SQL ตรงๆ ทำให้ผู้โจมตีสามารถพิมพ์คำสั่ง SQL แทรกเข้ามาเปลี่ยนเงื่อนไขการทำงานได้' },
      { q: 'ข้อใดคือลักษณะเด่นของฐานข้อมูลตระกูล SQL (Relational Database)', options: ['เก็บข้อมูลในรูปแบบตารางที่มีแถวและคอลัมน์ชัดเจน และเชื่อมโยงตารางด้วย Primary Key / Foreign Key', 'ไม่มีการกำหนดโครงสร้างตารางใดๆ ทั้งสิ้น', 'เก็บข้อมูลไว้เฉพาะใน RAM และหายไปเมื่อปิดเครื่อง'], answer: 0, explain: 'Relational Database จัดเก็บข้อมูลเป็นตารางที่มีความสัมพันธ์กันอย่างเป็นระบบ' },
      { q: 'ฐานข้อมูลใดต่อไปนี้จัดอยู่ในกลุ่ม SQL (Relational Database)', options: ['PostgreSQL และ MySQL', 'MongoDB และ Redis', 'HTML และ CSS'], answer: 0, explain: 'PostgreSQL และ MySQL เป็นฐานข้อมูลเชิงสัมพันธ์ที่ใช้ภาษา SQL เป็นมาตรฐาน' },
      { q: 'ฐานข้อมูลแบบ NoSQL (เช่น MongoDB) มีจุดเด่นที่เหมาะกับข้อมูลลักษณะใด', options: ['ข้อมูลในรูปแบบเอกสาร JSON ที่มีโครงสร้างยืดหยุ่นและแต่ละรายการอาจมีฟิลด์ย่อยแตกต่างกัน', 'ข้อมูลที่ห้ามเปลี่ยนโครงสร้างไปตลอด 50 ปี', 'ใช้แทนการ์ดจอในการเรนเดอร์ภาพ 3 มิติ'], answer: 0, explain: 'Document Database อย่าง MongoDB เก็บข้อมูลคล้าย JSON จึงรองรับข้อมูลที่มีฟิลด์ยืดหยุ่นได้ดี' },
      { q: 'วิธีป้องกันช่องโหว่ SQL Injection ที่ถูกต้องและปลอดภัยตามมาตรฐานสากลคือข้อใด', options: ['ใช้ Parameterized Query (Prepared Statement) เพื่อแยกข้อมูลของผู้ใช้ออกจากคำสั่ง SQL เสมอ', 'ซ่อนช่องกรอกข้อมูลไว้ด้านล่างของหน้าเว็บ', 'เปลี่ยนสีปุ่มกดเป็นสีแดง'], answer: 0, explain: 'Parameterized Query บังคับให้ฐานข้อมูลมองสิ่งที่ผู้ใช้กรอกเป็น "ข้อมูลตัวแปร" เท่านั้น ไม่สามารถกลายเป็นคำสั่ง SQL ได้' },
      { q: 'หากผู้โจมตีกรอกข้อความว่า admin\' OR \'1\'=\'1 ลงในช่องล็อกอินที่มีช่องโหว่ SQL Injection จะเกิดผลอย่างไร', options: ['เงื่อนไข WHERE กลายเป็นจริงเสมอ ทำให้ผู้โจมตีล็อกอินผ่านโดยไม่ต้องรู้รหัสผ่านจริง', 'ฐานข้อมูลจะอัปเกรดเวอร์ชันเองอัตโนมัติ', 'หน้าจอของผู้ใช้จะดับลงทันที'], answer: 0, explain: 'นิพจน์ OR \'1\'=\'1 เป็นจริงเสมอ ทำให้คำสั่ง SELECT คืนค่าแถวข้อมูลผู้ใช้กลับมาราวกับกรอกรหัสถูกต้อง' },
      { q: 'ทำไมระบบขนาดใหญ่ในปัจจุบันจึงนิยมใช้ทั้ง SQL และ NoSQL ร่วมกันในโปรเจกต์เดียว', options: ['ใช้ SQL เก็บข้อมูลหลักที่ต้องการความถูกต้องสูง (เช่น บัญชี/คำสั่งซื้อ) และใช้ NoSQL (เช่น Redis) ทำ Cache ความเร็วสูง', 'เพราะกฎหมายบังคับให้ต้องลงโปรแกรมครบทุกตัว', 'เพราะ SQL เก็บตัวอักษรภาษาไทยไม่ได้'], answer: 0, explain: 'การเลือกใช้ฐานข้อมูลแต่ละชนิดตามจุดแข็งช่วยให้ระบบมีความถูกต้องของข้อมูลและตอบสนองได้รวดเร็วพร้อมกัน' },
      { q: 'Primary Key ในตารางฐานข้อมูลมีหน้าที่สำคัญอย่างไร', options: ['ใช้เป็นรหัสอ้างอิงเฉพาะตัวของแต่ละแถวข้อมูลโดยห้ามซ้ำกันเลย (เช่น id หรือ uuid)', 'ใช้เก็บรหัสผ่านของแอดมิน', 'ใช้กำหนดสีพื้นหลังของตาราง'], answer: 0, explain: 'Primary Key ช่วยระบุตัวตนของข้อมูลแต่ละแถวได้อย่างไม่ซ้ำกันและใช้เชื่อมโยงกับตารางอื่น' },
      { q: 'เมื่อให้ AI ช่วยเขียนโค้ดดึงข้อมูลจากฐานข้อมูล นักพัฒนาควรตรวจทานบรรทัดคิวรีอย่างไร', options: ['ตรวจสอบว่าไม่มีการนำตัวแปรจากผู้ใช้มาต่อ String ใน SQL (`SELECT ... ${input}`) และมีการจำกัดจำนวนแถวที่ดึง', 'ดูแค่ว่าตั้งชื่อไฟล์สวยหรือไม่', 'ไม่ต้องตรวจเพราะ AI เขียน SQL ไม่เคยมีช่องโหว่'], answer: 0, explain: 'โค้ดจาก AI มักเผลอใช้ Template Literal ต่อ String ใน SQL ได้ง่าย นักพัฒนาจึงต้องตรวจสอบให้ใช้ Parameterized Query เสมอ' }
    ]
  },

  {
    id: 'clean-code-testing',
    no: 8,
    level: 'intermediate',
    category: 'Code Quality',
    keyword: 'TEST',
    subtitle: 'Software Testing & Clean Architecture',
    tagline: 'พื้นฐาน Testing, Unit/Integration Test และการจัดโครงสร้างโค้ด',
    title: 'Clean Code และการเขียน Test (Unit Test / Software Testing / Architecture)',
    summary: 'พื้นฐานของ Software Testing ที่ต้องรู้ครบจบในบทเดียว, การเขียน Unit & Integration Test, สาเหตุที่ทำให้เขียน Unit Test ยาก และการจัดโครงสร้างโค้ดด้วย Hexagonal Architecture',
    why: 'ยิ่งใช้ AI เขียนโค้ดได้เร็วเท่าไหร่ โอกาสที่โค้ดส่วนใหม่จะไปทำลายส่วนเก่าโดยไม่รู้ตัวยิ่งสูงขึ้น การมี Automated Test และโครงสร้างโค้ดที่แยกส่วนชัดเจนคือเกราะป้องกันที่ดีที่สุด',
    minutes: 17,
    topics: ['พื้นฐาน Software Testing', 'Unit & Integration Test', 'ทำไม Unit Test เขียนยาก', 'Hexagonal Architecture'],
    sections: [
      {
        id: 'software-testing-fundamentals',
        h: '1. พื้นฐานที่ต้องรู้ของการทำ Software Testing',
        html: `
          <p><strong>Software Testing</strong> คือกระบวนการตรวจสอบว่าโปรแกรมที่เรา (หรือ AI) เขียนขึ้น ทำงานได้ถูกต้องตามความต้องการ และไม่พังเมื่อเจอข้อมูลที่คาดไม่ถึง โดยแบ่งระดับการทดสอบตาม <strong>Test Pyramid</strong> ดังนี้:</p>
          <table>
            <tr><th>ระดับการทดสอบ</th><th>ทดสอบอะไร</th><th>ความเร็วและจำนวนที่ควรมี</th></tr>
            <tr><td><strong>1. Unit Testing</strong></td><td>ทดสอบฟังก์ชันหรือโมดูลย่อยๆ แยกเป็นอิสระ (เช่น ฟังก์ชันคำนวณส่วนลด)</td><td>รันเร็วมาก (หลักมิลลิวินาที) <strong>ควรมีจำนวนเยอะที่สุด</strong></td></tr>
            <tr><td><strong>2. Integration Testing</strong></td><td>ทดสอบการทำงานร่วมกันของหลายส่วน (เช่น เรียก API แล้วบันทึกลง Database จริงไหม)</td><td>ความเร็วปานกลาง มีจำนวนรองลงมา</td></tr>
            <tr><td><strong>3. End-to-End (E2E) Testing</strong></td><td>จำลองผู้ใช้เปิดเบราว์เซอร์กดปุ่มตั้งแต่หน้าแรกจนจบกระบวนการ</td><td>รันช้าที่สุด ใช้ทดสอบเฉพาะเส้นทางหลักที่สำคัญของธุรกิจ</td></tr>
          </table>
          <p><em>(ดูภาพรวมพื้นฐานทั้งหมดของ Software Testing ได้ในคลิปที่ 1)</em></p>`
      },
      {
        id: 'unit-and-integration-example',
        h: '2. ตัวอย่างการเขียน Unit Test และ Integration Test',
        html: `
          <p>โครงสร้างมาตรฐานของการเขียน Test ทุกภาษาจะใช้หลัก <strong>AAA (Arrange – Act – Assert)</strong> คือ เตรียมข้อมูล → เรียกใช้งานฟังก์ชัน → ตรวจว่าผลลัพธ์ตรงกับที่คาดไว้หรือไม่:</p>
          <pre><code>// ตัวอย่างฟังก์ชันคำนวณราคาสุทธิหลังหักส่วนลด
def calculate_net_price(price, discount_percent):
    if discount_percent &lt; 0 or discount_percent &gt; 100:
        raise ValueError("ส่วนลดต้องอยู่ระหว่าง 0 ถึง 100")
    return price * (100 - discount_percent) / 100

# Unit Test ตรวจสอบความถูกต้องและกรณีขอบเขต (Edge Case)
def test_calculate_net_price():
    assert calculate_net_price(1000, 20) == 800
    assert calculate_net_price(500, 0) == 500</code></pre>
          <div class="note">เมื่อเรามีชุด Test เหล่านี้ เวลาสั่งให้ AI แก้โค้ดหรือปรับปรุงความเร็ว เราแค่รันคำสั่งทดสอบเดียวก็จะรู้ทันทีว่ามีส่วนไหนพังหรือไม่ <em>(ดูวิธีเขียนจริงในคลิปที่ 2)</em></div>`
      },
      {
        id: 'why-unit-test-is-hard',
        h: '3. ทำไมหลายโปรเจกต์ถึงเขียน Unit Test ได้ยาก?',
        html: `
          <p>หลายคนตั้งใจจะเขียน Unit Test แต่พอเริ่มเขียนกลับพบว่าต้องตั้งค่าฐานข้อมูลจำลองหรือแก้โค้ดวุ่นวายไปหมด สาเหตุหลักไม่ได้อยู่ที่ตัวเครื่องมือทดสอบ แต่อยู่ที่ <strong>"โค้ดผูกติดกันแน่นเกินไป (Tight Coupling)"</strong>:</p>
          <ul>
            <li><strong>เอาลอจิกการคำนวณไปปนกับการยิงฐานข้อมูลหรือเรียก API ภายนอกในฟังก์ชันเดียวกัน:</strong> พอจะทดสอบแค่สูตรคำนวณ เลยต้องต่อฐานข้อมูลจริงไปด้วย</li>
            <li><strong>ฟังก์ชันหนึ่งทำหลายหน้าที่เกินไป:</strong> ทั้งรับค่า ตรวจสิทธิ์ คำนวณเงิน และส่งอีเมลอยู่ในฟังก์ชันยาว 200 บรรทัด</li>
            <li><strong>วิธีแก้:</strong> แยกฟังก์ชันคำนวณลอจิกธุรกิจ (Business Logic) ออกมาเป็นฟังก์ชันบริสุทธิ์ที่รับค่าเข้าและส่งค่าออก แล้วส่งตัวเชื่อมต่อภายนอกเข้ามาผ่านพารามิเตอร์ (Dependency Injection) <em>(ดูเจาะลึกสาเหตุและวิธีแก้ในคลิปที่ 3)</em></li>
          </ul>`
      },
      {
        id: 'hexagonal-architecture',
        h: '4. Hexagonal Architecture ดียังไง? ทำไมช่วยให้โค้ดสะอาดและดูแลง่าย',
        html: `
          <p>เพื่อแก้ปัญหาโค้ดพันกันจนเขียน Test ไม่ได้และเปลี่ยนเทคโนโลยีได้ยาก จึงมีแนวคิดการจัดโครงสร้างโค้ดที่เรียกว่า <strong>Hexagonal Architecture (หรือ Ports and Adapters)</strong>:</p>
          <div class="flow"><span>ช่องทางขาเข้า (Web / API)</span><i>→</i><span>Port</span><i>→</i><span><strong>แกนกลางธุรกิจ (Core Domain / Business Logic)</strong></span><i>→</i><span>Port</span><i>→</i><span>Adapter (Database / AI API / Email)</span></div>
          <ul>
            <li><strong>หัวใจสำคัญ:</strong> วางลอจิกหลักของธุรกิจไว้ตรงกลาง โดยไม่ผูกติดกับว่าข้างนอกจะใช้ฐานข้อมูลยี่ห้ออะไร หรือใช้ AI ค่ายไหน</li>
            <li><strong>เขียน Unit Test ได้ง่ายมาก:</strong> เพราะแกนกลางเป็นโค้ดล้วนๆ ที่ทดสอบได้ทันทีโดยไม่ต้องต่อ Database จริง</li>
            <li><strong>เปลี่ยนชิ้นส่วนได้อิสระในยุค AI:</strong> วันนี้ต่อกับ OpenAI วันหน้าอยากเปลี่ยนAdapter ไปต่อกับ Claude หรือ Gemini ก็แก้แค่ไฟล์เชื่อมต่อด้านนอกโดยไม่ต้องรื้อลอจิกหลักของระบบเลย <em>(ดูคำอธิบายในคลิปที่ 4)</em></li>
          </ul>`
      }
    ],
    quiz: [
      { q: 'สาเหตุหลักที่ทำให้โค้ดชุดหนึ่งเขียน Unit Test ได้ยากมากคืออะไร', options: ['ตั้งชื่อไฟล์สั้นเกินไป', 'ลอจิกการคำนวณผูกติดกับการเรียกฐานข้อมูลและบริการภายนอกในฟังก์ชันเดียวกัน (Tight Coupling)', 'ใช้จอคอมพิวเตอร์ขนาดเล็ก'], answer: 1, explain: 'เมื่อลอจิกผูกติดกับฐานข้อมูลหรือระบบภายนอกโดยตรง ทำให้ไม่สามารถแยกทดสอบเฉพาะลอจิกอย่างอิสระได้' },
      { q: 'แนวคิดหลักของ Hexagonal Architecture (Ports & Adapters) ช่วยให้ระบบดูแลรักษาง่ายขึ้นอย่างไร', options: ['แยกลอจิกหลักของธุรกิจ (Core Domain) ออกจากส่วนเชื่อมต่อฐานข้อมูลและ API ภายนอก ทำให้ทดสอบง่ายและเปลี่ยนเทคโนโลยีภายนอกได้โดยไม่กระทบแกนกลาง', 'รวมโค้ดทุกไฟล์ไว้ในไฟล์เดียว', 'ห้ามเขียนฟังก์ชันแยกกัน'], answer: 0, explain: 'การแยก Core Business Logic ออกจากส่วนเชื่อมต่อภายนอกผ่าน Port & Adapter ช่วยให้เขียน Unit Test ได้ง่ายและสับเปลี่ยนฐานข้อมูลหรือ AI API ได้สะดวก' },
      { q: 'ตามหลัก Test Pyramid การทดสอบระดับใดควรมีจำนวนมากที่สุดและทำงานได้เร็วที่สุด', options: ['Unit Testing', 'End-to-End (E2E) Testing', 'การให้คนมานั่งกดทดสอบด้วยมือทุกปุ่ม'], answer: 0, explain: 'Unit Test ทดสอบฟังก์ชันย่อยแยกเป็นอิสระ จึงรันเสร็จในระดับมิลลิวินาทีและควรมีจำนวนมากที่สุดเพื่อดักจับบั๊กตั้งแต่เนิ่นๆ' },
      { q: 'Integration Testing แตกต่างจาก Unit Testing อย่างไร', options: ['Integration Testing ทดสอบการทำงานเชื่อมต่อร่วมกันของหลายส่วน (เช่น API คุยกับ Database) ส่วน Unit Testing ทดสอบฟังก์ชันเดี่ยวๆ', 'Integration Testing ไม่ต้องเขียนโค้ด', 'Unit Testing ต้องเปิดเบราว์เซอร์จริงเสมอ'], answer: 0, explain: 'Integration Test เน้นตรวจว่าเมื่อนำโมดูลต่างๆ มาประกอบเข้าด้วยกันแล้วสามารถส่งต่อข้อมูลหากันได้ถูกต้องหรือไม่' },
      { q: 'โครงสร้างการเขียน Test แบบ AAA (Arrange – Act – Assert) หมายถึงลำดับใด', options: ['เตรียมข้อมูลตั้งต้น (Arrange) → เรียกใช้งานฟังก์ชันที่ต้องการทดสอบ (Act) → ตรวจสอบว่าผลลัพธ์ตรงกับที่คาดไว้หรือไม่ (Assert)', 'ลบข้อมูล → ปิดเครื่อง → เปิดใหม่', 'เขียนโค้ด → อัปโหลดขึ้นเซิร์ฟเวอร์ → รอผู้ใช้แจ้งบั๊ก'], answer: 0, explain: 'หลัก AAA ช่วยให้อ่านโค้ด Test เข้าใจง่ายว่าเตรียมข้อมูลอะไร ทดสอบฟังก์ชันไหน และคาดหวังผลลัพธ์อะไร' },
      { q: 'การทดสอบกรณีขอบเขต (Edge Cases) ในฟังก์ชันคำนวณส่วนลด หมายถึงการทดสอบกับข้อมูลลักษณะใด', options: ['ส่วนลดเป็น 0%, 100%, ค่าติดลบ หรือเกิน 100%', 'ทดสอบเฉพาะราคาสินค้า 100 บาทถ้วนเพียงค่าเดียว', 'ทดสอบเฉพาะตอนที่ปิดหน้าจอ'], answer: 0, explain: 'Edge Cases คือค่าสุดขอบหรือค่าผิดปกติที่มักทำให้โปรแกรมคำนวณผิดพลาดหรือแครชหากไม่ได้ดักไว้' },
      { q: 'ทำไมในยุคที่ใช้ AI ช่วยเขียนโค้ด การมี Automated Test จึงยิ่งสำคัญกว่าเดิม', options: ['เพราะ AI สามารถแก้โค้ดหลายไฟล์ได้อย่างรวดเร็ว การรัน Test อัตโนมัติช่วยยืนยันได้ทันทีว่าการแก้ไขครั้งใหม่ไม่ไปทำลายฟีเจอร์เดิม (Regression)', 'เพราะ AI ไม่ยอมทำงานถ้าไม่มีไฟล์ Test', 'เพื่อเพิ่มขนาดโฟลเดอร์โปรเจกต์ให้ดูใหญ่ขึ้น'], answer: 0, explain: 'Automated Test ทำหน้าที่เป็นตาข่ายนิรภัย (Safety Net) ที่ตรวจจับผลกระทบข้างเคียงจากการแก้โค้ดได้ทันที' },
      { q: 'End-to-End (E2E) Testing เช่นการใช้ Playwright จำลองการเปิดเบราว์เซอร์จริง เหมาะสำหรับใช้ทดสอบส่วนใด', options: ['เส้นทางหลักที่สำคัญที่สุดของผู้ใช้ (Critical User Journeys) เช่น ล็อกอิน → เลือกสินค้า → ชำระเงิน', 'ใช้ทดสอบฟังก์ชันบวกเลขย่อยๆ ทุกตัวในโปรเจกต์', 'ใช้แทนการตั้งรหัสผ่านเซิร์ฟเวอร์'], answer: 0, explain: 'เนื่องจาก E2E Test ใช้เวลาในการรันนานกว่า Unit Test มาก จึงนิยมเน้นเฉพาะ Flow หลักที่สำคัญต่อธุรกิจ' },
      { q: 'หากเราต้องการเปลี่ยนผู้ให้บริการส่งอีเมลหรือเปลี่ยนค่าย AI API ในระบบที่ออกแบบตามหลัก Hexagonal Architecture เราต้องแก้ไขโค้ดที่ส่วนใด', options: ['แก้ไขหรือสร้างเฉพาะไฟล์ Adapter ด้านนอก โดยไม่ต้องรื้อโค้ดลอจิกหลักของธุรกิจ (Core Domain)', 'ต้องลบโปรเจกต์ทิ้งแล้วเขียนใหม่ทั้งหมด', 'ต้องเปลี่ยนโครงสร้างตารางผู้ใช้ทั้งหมด'], answer: 0, explain: 'Adapter ทำหน้าที่แปลงการเชื่อมต่อกับบริการภายนอกให้เข้ากับ Port ของระบบ ทำให้เปลี่ยนบริการภายนอกได้โดยไม่กระทบแกนกลาง' },
      { q: 'ลักษณะของฟังก์ชันที่สะอาด (Clean Function) และนำไปเขียน Unit Test ต่อได้ง่ายที่สุดคือข้อใด', options: ['ทำหน้าที่เดียวอย่างชัดเจน รับค่าผ่านพารามิเตอร์ และคืนค่าผลลัพธ์ออกมาโดยไม่แอบแก้ไขตัวแปรภายนอกมั่วซั่ว', 'มีความยาวอย่างน้อย 1,000 บรรทัดในฟังก์ชันเดียว', 'ตั้งชื่อตัวแปรทั้งหมดว่า a, b, c, d'], answer: 0, explain: 'ฟังก์ชันที่ทำหน้าที่เดียว (Single Responsibility) และมี Input/Output ชัดเจนจะอ่านเข้าใจง่ายและเขียนชุดทดสอบได้ครบทุกกรณี' }
    ]
  },

  /* ======================= ADVANCED ======================= */
  {
    id: 'llm',
    no: 9,
    level: 'advanced',
    category: 'Generative AI',
    keyword: 'LLM',
    subtitle: 'Large Language Model',
    tagline: 'คืออะไร? ช่วยในงานธุรกิจได้อย่างไร',
    title: 'Large Language Model (LLM) คืออะไร? ภาพรวม LLM, RAG, Agent, Fine-tuning และ Ollama',
    summary: 'หลักการทำงานของ LLM การเปรียบเทียบ LLM vs RAG vs Agent vs Fine-tuning และการรันโมเดลบนเครื่องตัวเองด้วย Ollama',
    why: 'เครื่องมือที่ใช้ทุกวันทำงานบน LLM รู้ว่ามันทำงานอย่างไรและต่างจาก RAG/Agent/Fine-tuning อย่างไร จะเลือกสถาปัตยกรรมได้ถูกงาน',
    minutes: 20,
    topics: ['Next-token prediction', 'LLM vs RAG vs Agent vs Fine-tuning', 'Local LLM (Ollama)', 'Case Study & Copilot'],
    sections: [
      {
        id: 'what-is-llm',
        h: 'Large Language Model หรือ LLM คืออะไร',
        html: `
          <p><strong>Large Language Model (LLM)</strong> คือโมเดลปัญญาประดิษฐ์ที่ถูกฝึกด้วยข้อความจำนวนมหาศาล ทั้งหนังสือ บทความ เว็บไซต์ และซอร์สโค้ด จนสามารถเข้าใจบริบทของภาษาและสร้างข้อความตอบกลับได้อย่างเป็นธรรมชาติ</p>
          <p>คำว่า "Large" หมายถึงจำนวนพารามิเตอร์ (ค่าที่โมเดลเรียนรู้) ซึ่งมีตั้งแต่หลักพันล้านถึงหลักล้านล้าน ตัวอย่างที่รู้จักกันดีคือ GPT, Gemini, Claude และ Llama</p>
          <div class="note">สรุปสั้นๆ: LLM ไม่ได้ "ค้นหาความจริง" แบบฐานข้อมูล แต่เก่งมากในการ <strong>คาดการณ์ว่าคำหรือ token ถัดไปควรเป็นอะไร</strong> จากรูปแบบที่เคยเรียนรู้มา</div>`
      },
      {
        id: 'how-llm-works',
        h: 'LLM ทำงานอย่างไร?',
        html: `
          <p>ขั้นตอนหลักของการทำงานแบ่งเป็น 3 ช่วงสำคัญ</p>
          <ol>
            <li><strong>Tokenization</strong> — ตัดข้อความออกเป็นชิ้นย่อยๆ เรียกว่า token (อาจเป็นคำ ส่วนของคำ หรือสัญลักษณ์ในโค้ด)</li>
            <li><strong>ประมวลผลด้วยสถาปัตยกรรม Transformer</strong> — โมเดลคำนวณความสัมพันธ์ของทุก token ในประโยคพร้อมกัน (Self-Attention) เพื่อเข้าใจบริบทของคำ</li>
            <li><strong>คาดการณ์ token ถัดไป (Next-Token Prediction)</strong> — ให้คะแนนความน่าจะเป็นของทุก token ที่เป็นไปได้ แล้วเลือกมาหนึ่งตัวเพื่อต่อท้ายข้อความเดิม ทำซ้ำไปเรื่อยๆ จนจบคำตอบ</li>
          </ol>
          <div class="flow"><span>ข้อความตั้งต้น</span><i>→</i><span>แปลงเป็น Tokens</span><i>→</i><span>Transformer Attention</span><i>→</i><span>คำนวณความน่าจะเป็น</span><i>→</i><span>เลือก Token ถัดไป</span><i>↺</i></div>`
      },
      {
        id: 'next-token-example',
        h: 'รูปตัวอย่างของการคาดการณ์คำถัดไปของ LLM และ Generative AI',
        html: `
          <p>สมมติว่าเราป้อนประโยคตั้งต้นว่า <code>"การตรวจสอบโค้ดก่อนนำขึ้นระบบจริงช่วยให้"</code> โมเดลจะคำนวณความน่าจะเป็นของคำถัดไปดังนี้</p>
          <table>
            <tr><th>คำ / Token ถัดไปที่เป็นไปได้</th><th>ความน่าจะเป็น (Probability)</th></tr>
            <tr><td><strong>ลดข้อผิดพลาด</strong></td><td>42%</td></tr>
            <tr><td><strong>ระบบปลอดภัยขึ้น</strong></td><td>28%</td></tr>
            <tr><td><strong>ทีมทำงานง่ายขึ้น</strong></td><td>15%</td></tr>
            <tr><td>คำอื่นๆ</td><td>15%</td></tr>
          </table>
          <p>ค่าพารามิเตอร์ที่เรียกว่า <code>temperature</code> จะเป็นตัวกำหนดว่าโมเดลจะเลือกคำที่มีโอกาสสูงสุดเสมอ (ค่าต่ำ เช่น <code>0.1 - 0.2</code> เหมาะกับงานเขียนโค้ดและตอบข้อมูลข้อเท็จจริง) หรือสุ่มคำรองลงมาเพื่อให้ได้ข้อความที่หลากหลายขึ้น (ค่าสูง เหมาะกับงานคิดไอเดียและงานเขียนเชิงสร้างสรรค์)</p>`
      },
      {
        id: 'ai-landscape',
        h: 'สรุปภาพรวมที่ Dev ยุค AI ต้องรู้: LLM, RAG, Agent และ Fine-tuning ต่างกันอย่างไร',
        html: `
          <p>ในการพัฒนาระบบจริง เราไม่ได้ใช้แค่ LLM เปล่าๆ เสมอไป แต่ต้องเข้าใจ 4 คำสำคัญที่ทำงานร่วมกัน (สอดคล้องกับคลิปสรุปภาพรวมของ MilerDev ในบทนี้):</p>
          <table>
            <tr><th>แนวคิด</th><th>หน้าที่หลัก</th><th>ใช้เมื่อไร</th></tr>
            <tr><td><strong>LLM (Base / Instruct Model)</strong></td><td>สมองหลักที่เข้าใจภาษา สรุปความ แปลภาษา และเขียนโค้ดจากความรู้ที่เคยฝึกมา</td><td>งานทั่วไปที่ไม่ต้องพึ่งพาข้อมูลลับภายในองค์กรหรือข้อมูลเรียลไทม์</td></tr>
            <tr><td><strong>RAG (Retrieval-Augmented Generation)</strong></td><td>เปิดโพยเอกสาร: ค้นข้อมูลจากฐานความรู้ของเรามาแนบใน Prompt ก่อนให้ LLM ตอบ</td><td>เมื่อต้องการให้ AI ตอบจากข้อมูลภายในบริษัท คู่มือสินค้า หรือข้อมูลที่อัปเดตบ่อย</td></tr>
            <tr><td><strong>AI Agent</strong></td><td>ให้แขนขาแก่ LLM: สามารถวางแผนและเรียกใช้เครื่องมือภายนอก (API, ค้นเว็บ, รันโค้ด, คิวรี DB) ได้เอง</td><td>เมื่อต้องการให้ AI "ลงมือทำงาน" หลายขั้นตอนแทนมนุษย์ ไม่ใช่แค่ตอบแชท</td></tr>
            <tr><td><strong>Fine-tuning</strong></td><td>การฝึกโมเดลเพิ่มด้วยชุดข้อมูลเฉพาะทางเพื่อเปลี่ยนสไตล์การตอบ รูปแบบ Output หรือคำศัพท์เฉพาะด้าน</td><td>เมื่อ Prompt Engineering และ RAG ไม่เพียงพอ หรือต้องการบีบอัดให้โมเดลขนาดเล็กเก่งงานเฉพาะทาง</td></tr>
          </table>`
      },
      {
        id: 'ollama-local-llm',
        h: 'รู้จัก Ollama: การรันโมเดล LLM บนเครื่องตัวเอง (Local LLM)',
        html: `
          <p>นอกจากเรียกใช้ Cloud API อย่าง OpenAI หรือ Gemini แล้ว นักพัฒนายังสามารถรันโมเดล Open Weights (เช่น Llama 3, Qwen, Mistral, DeepSeek) บนคอมพิวเตอร์หรือเซิร์ฟเวอร์ของตัวเองได้ฟรีด้วยเครื่องมือชื่อ <strong>Ollama</strong></p>
          <ul>
            <li><strong>ความเป็นส่วนตัวของข้อมูล (Data Privacy):</strong> ข้อมูลโค้ดและเอกสารสำคัญไม่ถูกส่งออกไปยังคลาวด์ภายนอก</li>
            <li><strong>ไม่มีค่าใช้จ่ายตามจำนวน Token:</strong> รันทดสอบบนเครื่องตัวเองได้ไม่จำกัด เหมาะมากตอนกำลังพัฒนาโปรเจกต์</li>
            <li><strong>มี REST API ในตัว:</strong> เมื่อรัน Ollama จะเปิดพอร์ต <code>http://localhost:11434</code> ให้โค้ดของเราเชื่อมต่อได้เหมือนเรียก API ปกติ</li>
          </ul>
          <pre><code># คำสั่งพื้นฐานของ Ollama บน Terminal
ollama pull llama3.2          # ดาวน์โหลดโมเดลมาเก็บในเครื่อง
ollama run llama3.2           # เริ่มแชทกับโมเดลผ่าน Terminal ทันที
ollama list                   # ดูรายการโมเดลที่มีในเครื่อง</code></pre>`
      },
      {
        id: 'llm-examples',
        h: 'ตัวอย่างของ Large Language Model และการประยุกต์ใช้ในธุรกิจ',
        html: `
          <table>
            <tr><th>โมเดล</th><th>ผู้พัฒนา</th><th>จุดเด่นในการใช้งาน</th></tr>
            <tr><td><strong>GPT Series</strong></td><td>OpenAI</td><td>ใช้งานได้หลากหลาย มีเครื่องมือและ API ครบวงจร</td></tr>
            <tr><td><strong>Gemini</strong></td><td>Google</td><td>รองรับข้อมูลหลายรูปแบบ (ข้อความ ภาพ เสียง โค้ด) และมี Context Window ขนาดใหญ่</td></tr>
            <tr><td><strong>Claude</strong></td><td>Anthropic</td><td>โดดเด่นด้านการเขียนโค้ด การรีวิวเอกสารยาวๆ และการทำตามคำสั่งที่ซับซ้อน</td></tr>
            <tr><td><strong>Llama / Qwen</strong></td><td>Meta / Alibaba</td><td>เปิดให้ดาวน์โหลดน้ำหนักโมเดล (Open Weights) ไปรันผ่าน Ollama หรือเซิร์ฟเวอร์องค์กรได้</td></tr>
          </table>`,
        sub: [
          {
            id: 'llm-and-work',
            h: 'LLM เกี่ยวข้องกับธุรกิจของคุณอย่างไร?',
            html: `
              <ul>
                <li><strong>ด้านการพัฒนาซอฟต์แวร์:</strong> ช่วยร่างโค้ดพื้นฐาน อธิบายโค้ดเก่าที่ไม่มีเอกสาร สร้าง Unit Test และช่วยหาจุดผิดพลาด</li>
                <li><strong>ด้านบริการลูกค้า:</strong> สร้างระบบตอบคำถามอัตโนมัติที่อ้างอิงจากคู่มือสินค้าจริงของบริษัท</li>
                <li><strong>ข้อควรระวังสำคัญ:</strong> LLM อาจเกิดอาการ <em>Hallucination</em> (ตอบข้อมูลที่ผิดด้วยน้ำเสียงมั่นใจ) จึงต้องมีขั้นตอนการตรวจสอบและออกแบบระบบควบคุมเสมอ</li>
              </ul>`
          }
        ]
      }
    ],
    quiz: [
      { q: 'หลักการทำงานพื้นฐานที่สุดของ LLM คืออะไร', options: ['ค้นหาคำตอบจากฐานข้อมูลโดยตรง', 'คาดการณ์คำหรือ token ถัดไปจากความน่าจะเป็น (Next-Token Prediction)', 'รันโค้ดทุกครั้งก่อนตอบ'], answer: 1, explain: 'LLM สร้างข้อความโดยการคำนวณความน่าจะเป็นของ token ถัดไปทีละตัว' },
      { q: 'หากต้องการให้ AI ตอบคำถามจากเอกสารคู่มือสินค้าภายในบริษัทที่อัปเดตทุกสัปดาห์ ควรเลือกใช้เทคนิคใดเป็นอันดับแรก', options: ['ฝึกโมเดลใหม่ทั้งหมดตั้งแต่ศูนย์', 'RAG (Retrieval-Augmented Generation)', 'ตั้งค่า temperature เป็น 1.0'], answer: 1, explain: 'RAG ช่วยดึงข้อมูลล่าสุดจากเอกสารมาแนบใน Prompt โดยไม่ต้องเสียเวลาและค่าใช้จ่ายฝึกโมเดลใหม่' },
      { q: 'ข้อดีสำคัญของการรันโมเดล LLM บนเครื่องตัวเองด้วย Ollama คืออะไร', options: ['ทำให้ไม่ต้องเขียนโค้ดเลย', 'ข้อมูลไม่รั่วไหลออกนอกเครื่องและทดสอบได้โดยไม่เสียค่า API ตามจำนวน Token', 'ทำให้โมเดลไม่มีโอกาสเกิด Hallucination'], answer: 1, explain: 'Ollama รันโมเดลแบบ Local จึงช่วยรักษาความลับของข้อมูลและประหยัดค่า API ระหว่างพัฒนา' },
      { q: 'ขั้นตอน Tokenization ในการทำงานของ LLM หมายถึงอะไร', options: ['การตัดแบ่งข้อความออกเป็นชิ้นย่อยๆ (Tokens) เช่น คำหรือส่วนของคำ ก่อนส่งเข้าโมเดลประมวลผล', 'การเข้ารหัสรหัสผ่านของผู้ใช้', 'การบีบอัดไฟล์วิดีโอ'], answer: 0, explain: 'LLM ไม่ได้อ่านข้อความทีละตัวอักษรโดยตรง แต่แปลงข้อความเป็นหน่วยย่อยที่เรียกว่า Token ก่อนคำนวณ' },
      { q: 'สถาปัตยกรรมโครงข่ายประสาทเทียมที่เป็นหัวใจหลักของโมเดล LLM ยุคใหม่ (เช่น GPT, Gemini, Claude) คืออะไร', options: ['Transformer Architecture (Self-Attention)', 'ตาราง Excel', 'FTP Server'], answer: 0, explain: 'สถาปัตยกรรม Transformer ใช้กลไก Self-Attention ในการคำนวณความสัมพันธ์ของทุกคำในบริบทพร้อมกัน' },
      { q: 'การตั้งค่าพารามิเตอร์ temperature ให้ต่ำมาก (เช่น 0.0 – 0.2) เหมาะกับงานประเภทใดมากที่สุด', options: ['งานเขียนโค้ด สกัดข้อมูล JSON หรือตอบคำถามที่ต้องการความแม่นยำและสม่ำเสมอสูง', 'งานแต่งกลอนหรือคิดสโลแกนโฆษณาที่ต้องการความแปลกใหม่มากๆ', 'ใช้เพิ่มความเร็วพัดลมการ์ดจอ'], answer: 0, explain: 'Temperature ต่ำทำให้โมเดลเลือก Token ที่มีความน่าจะเป็นสูงสุดเป็นหลัก คำตอบจึงนิ่งและแม่นยำเหมาะกับงานวิศวกรรมซอฟต์แวร์' },
      { q: 'การทำ Fine-tuning เหมาะกับสถานการณ์ใดมากที่สุด', options: ['เมื่อต้องการปรับสไตล์การตอบ รูปแบบ Output เฉพาะทาง หรือทำให้โมเดลขนาดเล็กเชี่ยวชาญงานเฉพาะด้าน', 'เมื่อแค่อยากให้ AI รู้ราคาสินค้าที่เปลี่ยนทุกชั่วโมง', 'เมื่อต้องการเปลี่ยนสีหน้าเว็บ'], answer: 0, explain: 'ข้อมูลที่เปลี่ยนบ่อยควรใช้ RAG ส่วนการปรับพฤติกรรม สไตล์ภาษา หรือรูปแบบเฉพาะทางของโมเดลจึงใช้ Fine-tuning' },
      { q: 'พอร์ตเริ่มต้นของ REST API ที่โปรแกรม Ollama เปิดให้โค้ดในเครื่องเชื่อมต่อคือพอร์ตใด', options: ['http://localhost:11434', 'http://localhost:80', 'http://localhost:3306'], answer: 0, explain: 'Ollama เปิด Local API Server ที่พอร์ต 11434 เป็นค่ามาตรฐาน' },
      { q: 'คำสั่งใดของ Ollama ที่ใช้ดาวน์โหลดและเริ่มสนทนากับโมเดล Llama 3.2 บน Terminal ทันที', options: ['ollama run llama3.2', 'git push llama3.2', 'npm install llama3.2'], answer: 0, explain: 'คำสั่ง ollama run <ชื่อโมเดล> จะดาวน์โหลดโมเดล (หากยังไม่มี) และเปิดโหมดสนทนาให้ทันที' },
      { q: 'ข้อใดคือความหมายของคำว่า Context Window ในโมเดล LLM', options: ['ขนาดความจุสูงสุดของจำนวน Token (ทั้งคำสั่งขาเข้าและคำตอบขาออก) ที่โมเดลสามารถรับรู้และประมวลผลได้ในหนึ่งรอบ', 'ขนาดความกว้างของหน้าจอคอมพิวเตอร์', 'จำนวนหน้าต่างเบราว์เซอร์ที่เปิดพร้อมกัน'], answer: 0, explain: 'Context Window คือขอบเขตความจำระยะสั้นของโมเดลในหนึ่งการสนทนา หากส่งข้อมูลเกินขีดจำกัดนี้ข้อมูลบางส่วนจะถูกตัดทิ้ง' }
    ]
  },

  {
    id: 'rag',
    no: 10,
    level: 'advanced',
    category: 'AI Engineering',
    keyword: 'RAG',
    subtitle: 'Retrieval-Augmented Generation',
    tagline: 'ให้ AI ตอบจากข้อมูลของเรา',
    title: 'RAG และ Vector Database: เทคนิคที่ทำให้ AI เก่งขึ้นและตอบข้อมูลสินค้าด้วย LangChain',
    summary: 'ทำไม RAG ถึงทำให้ AI เก่งขึ้น การแปลงข้อความเป็น Embedding และการสร้างแชทถามตอบข้อมูลสินค้าด้วย LangChain',
    why: 'LLM ไม่รู้ข้อมูลภายในบริษัทหรือสต็อกสินค้าของเรา RAG คือสถาปัตยกรรมมาตรฐานในการเชื่อมข้อมูลจริงเข้ากับ AI',
    minutes: 18,
    topics: ['Why RAG', 'Embedding & Vector DB', 'Chunking', 'LangChain Product Q&A'],
    sections: [
      {
        id: 'problem',
        h: 'ทำไม ‘RAG’ ถึงเป็นเทคนิคที่ทำให้ AI เก่งขึ้น?',
        html: `
          <p>โดยปกติ LLM จะตอบได้เฉพาะสิ่งที่เคยเห็นตอนฝึก (Training Data Cutoff) และไม่รู้จักข้อมูลภายในองค์กร เช่น รายการสินค้า ราคาโปรโมชันล่าสุด หรือระเบียบการเคลมสินค้า หากถามตรงๆ โมเดลอาจตอบไม่ได้หรือแต่งคำตอบขึ้นมาเอง (Hallucination)</p>
          <p><strong>RAG (Retrieval-Augmented Generation)</strong> แก้ปัญหานี้ด้วยการเปลี่ยนจากการ "จำตอบ" เป็นการ <strong>"เปิดหนังสืออ้างอิงตอบ"</strong> คือให้ระบบค้นหาข้อมูลที่เกี่ยวข้องจากฐานข้อมูลของเรามาก่อน แล้วส่งข้อมูลนั้นแนบไปพร้อมคำถามเพื่อให้ LLM สรุปคำตอบที่แม่นยำ</p>
          <div class="note">ข้อดีของ RAG: เมื่อข้อมูลสินค้าหรือราคาเปลี่ยน เราแค่อัปเดตฐานข้อมูล ไม่ต้องเสียเงินฝึกโมเดล (Fine-tune) ใหม่ และยังให้ AI แสดงแหล่งอ้างอิงได้ด้วย</div>`
      },
      {
        id: 'pipeline',
        h: 'ขั้นตอนการทำงานของระบบ RAG 2 ช่วงหลัก',
        html: `
          <p><strong>ช่วงที่ 1: การเตรียมข้อมูลเข้าฐานข้อมูล (Indexing Pipeline)</strong></p>
          <div class="flow"><span>ข้อมูลสินค้า / เอกสาร</span><i>→</i><span>ตัดแบ่งชิ้น (Chunking)</span><i>→</i><span>แปลงเป็น Embedding</span><i>→</i><span>เก็บใน Vector DB</span></div>
          <p><strong>ช่วงที่ 2: การค้นหาและตอบคำถาม (Retrieval & Generation)</strong></p>
          <div class="flow"><span>คำถามลูกค้า</span><i>→</i><span>แปลงเป็น Embedding</span><i>→</i><span>ค้นหาชิ้นที่ความหมายใกล้กัน</span><i>→</i><span>ประกอบ Prompt</span><i>→</i><span>LLM สรุปคำตอบ</span></div>`,
        sub: [
          {
            id: 'embedding',
            h: 'Embedding และ Vector Database คืออะไร',
            html: `<p><strong>Embedding</strong> คือการแปลงข้อความให้กลายเป็นชุดตัวเลขหลายมิติ (Vector) ตาม "ความหมาย" ของประโยค ทำให้การค้นหาแบบ <em>Semantic Search</em> เข้าใจว่าลูกค้าที่พิมพ์ว่า <code>"หูฟังใส่วิ่งกันเหงื่อ"</code> มีความหมายใกล้เคียงกับสินค้าที่ระบุว่า <code>"หูฟังไร้สายมาตรฐานกันน้ำ IPX5 สำหรับออกกำลังกาย"</code> แม้จะใช้คำไม่ตรงกันเป๊ะก็ตาม</p>`
          },
          {
            id: 'chunking',
            h: 'การตัดเอกสาร (Chunking)',
            html: `<p>การแบ่งเอกสารยาวๆ หรือรายละเอียดสินค้าออกเป็นชิ้นย่อยขนาดพอเหมาะ (เช่น 300–600 tokens) พร้อมกำหนดระยะซ้อนทับ (Chunk Overlap) เล็กน้อย เพื่อไม่ให้ประโยคสำคัญถูกตัดขาดกลางคัน</p>`
          }
        ]
      },
      {
        id: 'langchain-product-qa',
        h: 'แนวทางสร้างแชทถาม-ตอบข้อมูลสินค้าแบบง่ายๆ ด้วย LangChain',
        html: `
          <p><strong>LangChain</strong> คือเฟรมเวิร์กที่ช่วยเชื่อมขั้นตอนการโหลดเอกสาร การทำ Embedding การค้นหาใน Vector Store และการส่งต่อให้ LLM เข้าด้วยกันอย่างเป็นระบบ ตัวอย่างโครงสร้างการทำระบบถาม-ตอบข้อมูลสินค้า:</p>
          <pre><code>// แนวคิดการประกอบ Prompt สำหรับแชทบอทถามตอบข้อมูลสินค้า
const systemPrompt = \`
คุณคือผู้ช่วยแนะนำสินค้าของร้าน ตอบคำถามลูกค้าอย่างสุภาพและตรงประเด็น
โดยใช้เฉพาะข้อมูลสินค้าที่ให้ไว้ใน [ข้อมูลสินค้าอ้างอิง] ด้านล่างนี้เท่านั้น
ห้ามคิดราคาหรือสเปกสินค้าขึ้นเอง หากไม่มีข้อมูลให้ตอบว่า "ขออภัยครับ ไม่พบข้อมูลสินค้าดังกล่าวในระบบ"

[ข้อมูลสินค้าอ้างอิง]
{retrieved_product_chunks}

[คำถามของลูกค้า]
{user_question}
\`;</code></pre>`
      },
      {
        id: 'evaluate',
        h: 'การตรวจสอบและปรับปรุงคุณภาพของระบบ RAG',
        html: `
          <ul>
            <li><strong>Retrieval Quality:</strong> เมื่อลูกค้าถาม ระบบดึงข้อมูลสินค้าชิ้นที่ถูกต้องมาให้ LLM หรือไม่ (ตรวจสอบค่า Top-K และการแบ่ง Chunk)</li>
            <li><strong>Groundedness (ความซื่อสัตย์ต่อข้อมูล):</strong> คำตอบของ LLM อ้างอิงจากข้อมูลที่ดึงมาจริงหรือไม่ หรือเผลอเดาข้อมูลเพิ่มเอง</li>
            <li><strong>Hybrid Search:</strong> ในระบบอีคอมเมิร์ซ มักใช้การค้นหาด้วยความหมาย (Vector Search) ร่วมกับการค้นหาด้วยคำตรงตัว (Keyword / SKU Search) เพื่อให้ค้นชื่อรุ่นสินค้าหรือรหัสสินค้าได้แม่นยำขึ้น</li>
          </ul>`
      }
    ],
    quiz: [
      { q: 'เหตุผลหลักที่ทำให้เทคนิค RAG ช่วยให้ AI ตอบคำถามเรื่องข้อมูลสินค้าของบริษัทได้ดีขึ้นคืออะไร', options: ['เพราะ RAG เปลี่ยนโครงสร้างสมองของ LLM ถาวร', 'เพราะ RAG ค้นหาข้อมูลจริงที่เกี่ยวข้องมาแนบใน Prompt ให้ LLM ใช้เป็นข้อมูลอ้างอิงก่อนตอบ', 'เพราะ RAG ทำให้ไม่ต้องใช้ LLM อีกต่อไป'], answer: 1, explain: 'RAG ดึงข้อมูลที่เกี่ยวข้องจากฐานข้อมูลของเรามาใส่ในบริบท (Context) ให้ LLM ตอบตามข้อเท็จจริง' },
      { q: 'Embedding ช่วยในการค้นหาข้อมูลสินค้าอย่างไร', options: ['ช่วยบีบอัดรูปภาพสินค้าให้เล็กลง', 'แปลงข้อความเป็นตัวเลขตามความหมาย ทำให้ค้นเจอสินค้าที่ความหมายตรงกันแม้ลูกค้าใช้คำเรียกต่างกัน', 'ช่วยเข้ารหัสรหัสผ่านของลูกค้า'], answer: 1, explain: 'Embedding แทนความหมายเชิงลึกของข้อความด้วย Vector ทำให้ทำ Semantic Search ได้' },
      { q: 'คำว่า RAG ย่อมาจากอะไร', options: ['Retrieval-Augmented Generation', 'Random Access Graphics', 'Rapid Application Gateway'], answer: 0, explain: 'RAG ย่อมาจาก Retrieval-Augmented Generation คือการค้นข้อมูลอ้างอิงมาเสริมการสร้างคำตอบของโมเดล' },
      { q: 'ทำไมเราจึงต้องทำ Chunking (การตัดแบ่งเอกสารเป็นชิ้นย่อย) ก่อนแปลงเป็น Embedding เก็บลง Vector Database', options: ['เพื่อให้ค้นหาเฉพาะย่อหน้าที่ตรงกับคำถามได้อย่างแม่นยำ และไม่ส่งเอกสารทั้งเล่มจนล้น Context Window', 'เพื่อทำให้ไฟล์เอกสารลบตัวเองอัตโนมัติ', 'เพื่อให้เปลี่ยนภาษาไทยเป็นภาษาจีน'], answer: 0, explain: 'การแบ่งเอกสารเป็นชิ้นขนาดพอเหมาะ (เช่น 300–600 tokens) ช่วยให้ดึงเฉพาะเนื้อหาส่วนที่เกี่ยวข้องมาใส่ Prompt ได้อย่างคุ้มค่า' },
      { q: 'การกำหนด Chunk Overlap (ระยะซ้อนทับกันเล็กน้อยระหว่างชิ้นข้อความที่ติดกัน) มีประโยชน์อย่างไร', options: ['ป้องกันไม่ให้ใจความสำคัญที่อยู่ตรงรอยต่อระหว่างย่อหน้าถูกตัดขาดออกจากกัน', 'ทำให้ฐานข้อมูลใช้พื้นที่น้อยลงครึ่งหนึ่ง', 'ทำให้ไม่ต้องใช้ Embedding'], answer: 0, explain: 'Chunk Overlap ช่วยรักษาบริบทของประโยคที่อยู่บริเวณจุดตัดระหว่างชิ้นข้อมูล' },
      { q: 'Vector Database (หรือส่วนขยายอย่าง pgvector ใน PostgreSQL) ทำหน้าที่หลักอะไรในระบบ RAG', options: ['จัดเก็บชุดตัวเลข Embedding และค้นหาชิ้นข้อมูลที่มีความหมายใกล้เคียงกับคำถามมากที่สุดอย่างรวดเร็ว', 'ใช้ตัดต่อวิดีโอความละเอียดสูง', 'ใช้แทนระบบปฏิบัติการ Linux'], answer: 0, explain: 'Vector Database ออกแบบมาเพื่อคำนวณระยะห่างหรือความคล้ายคลึงของเวกเตอร์ (Similarity Search) โดยเฉพาะ' },
      { q: 'ใน System Prompt ของแชทบอท RAG เราควรสั่งกำชับโมเดลอย่างไรเพื่อป้องกันอาการแต่งข้อมูลเอง (Hallucination)', options: ['สั่งให้ตอบโดยใช้เฉพาะข้อมูลในส่วนเอกสารอ้างอิงเท่านั้น หากไม่พบคำตอบให้แจ้งตรงๆ ว่าไม่พบข้อมูลในระบบ', 'สั่งให้เดาคำตอบที่ดูน่าเชื่อถือที่สุดเสมอแม้ไม่มีข้อมูล', 'สั่งให้ตอบเป็นบทกลอนทุกครั้ง'], answer: 0, explain: 'การกำชับให้ยึดตามบริบทที่ดึงมา (Groundedness) และอนุญาตให้ตอบว่า "ไม่พบข้อมูล" ช่วยลดการหลอนได้อย่างมาก' },
      { q: 'การทำ Hybrid Search ในระบบ RAG สำหรับร้านค้าออนไลน์หมายถึงอะไร', options: ['การผสานทั้งการค้นหาด้วยความหมาย (Vector Search) ร่วมกับการค้นหาคำตรงตัว (Keyword / รหัสสินค้า SKU)', 'การเปิดเซิร์ฟเวอร์ครึ่งวันปิดครึ่งวัน', 'การใช้เมาส์สองตัวพร้อมกัน'], answer: 0, explain: 'Hybrid Search ช่วยให้ค้นเจอทั้งคำถามเชิงความหมายกว้างๆ และชื่อรุ่นหรือรหัสสินค้าที่ต้องตรงตัวเป๊ะๆ' },
      { q: 'หากราคาสินค้าในร้านมีการเปลี่ยนแปลง ระบบที่ใช้สถาปัตยกรรม RAG ต้องทำอย่างไรเพื่อให้ AI ตอบราคาใหม่ได้ทันที', options: ['อัปเดตข้อมูลราคาและ Embedding ของสินค้านั้นในฐานข้อมูล โดยไม่ต้องฝึกโมเดล LLM ใหม่', 'ต้องเทรนโมเดล LLM ใหม่ทั้งหมดตั้งแต่ศูนย์ใช้เวลาหลายเดือน', 'ต้องซื้อคอมพิวเตอร์เครื่องใหม่'], answer: 0, explain: 'จุดเด่นสำคัญของ RAG คือเมื่ออัปเดตข้อมูลในฐานความรู้ที่ดึงมาอ้างอิง AI ก็จะตอบตามข้อมูลล่าสุดได้ทันที' },
      { q: 'หากระบบ RAG ตอบคำถามผิดพลาดเพราะ "ดึงเอกสารคนละเรื่องมาใส่ใน Prompt" นักพัฒนาควรปรับปรุงที่ขั้นตอนใดก่อน', options: ['ปรับปรุงขั้นตอน Retrieval (เช่น การแบ่ง Chunk, คุณภาพ Embedding หรือจำนวน Top-K ที่ดึงมา)', 'เปลี่ยนสีหน้าเว็บแชทบอท', 'ลดขนาดหน้าจอมอนิเตอร์'], answer: 0, explain: 'หากข้อมูลที่ดึงมาจากขั้น Retrieval ไม่ตรงคำถาม ต่อให้ LLM เก่งแค่ไหนก็จะไม่มีข้อมูลที่ถูกต้องไปสรุปคำตอบ' }
    ]
  },

  {
    id: 'ai-agents',
    no: 11,
    level: 'advanced',
    category: 'AI Engineering',
    keyword: 'AGENT',
    subtitle: 'AI Agents & MCP',
    tagline: 'ให้ AI วางแผนและเชื่อมต่อเครื่องมือทำงานแทนเรา',
    title: 'Agentic AI และ MCP: AI Agent ทำงานแทนเราได้อย่างไร และการจับคู่ MCP กับ Claude',
    summary: 'กลไกการทำงานของ Agentic AI, พื้นฐานก่อนเรียน MCP (Model Context Protocol), และ 4 Use Cases การใช้ MCP ยกระดับ AI',
    why: 'ยุคต่อไปของ AI ไม่ใช่แค่แชทบอทที่รอตอบคำถาม แต่คือ Agentic AI ที่เชื่อมต่อกับฐานข้อมูล ระบบไฟล์ และเครื่องมือจริงผ่านมาตรฐาน MCP',
    minutes: 20,
    topics: ['Agentic AI', 'Tool Calling & Agent Loop', 'MCP Fundamentals', 'MCP + Claude Use Cases'],
    sections: [
      {
        id: 'what-is-agentic-ai',
        h: 'Agentic AI คืออะไร? ทำไม AI Agent ถึงทำงานแทนเราได้',
        html: `
          <p>ความแตกต่างสำคัญระหว่าง <strong>LLM ทั่วไป (Passive Chatbot)</strong> กับ <strong>AI Agent (Agentic AI)</strong> คือ LLM ทั่วไปทำได้เพียงรับข้อความแล้วสร้างข้อความตอบกลับ แต่ <strong>AI Agent</strong> มีองค์ประกอบสำคัญครบ 4 ส่วนที่ทำให้มันลงมือทำงานแทนเราได้จริง:</p>
          <ol>
            <li><strong>Brain (LLM):</strong> ทำหน้าที่คิดวิเคราะห์ แยกแยะเป้าหมายใหญ่ให้เป็นขั้นตอนย่อย (Reasoning & Planning)</li>
            <li><strong>Memory:</strong> จดจำบริบทของการสนทนาและผลลัพธ์จากขั้นตอนก่อนหน้า</li>
            <li><strong>Tools (แขนขาของ Agent):</strong> ความสามารถในการเรียกใช้ฟังก์ชันภายนอก (Function / Tool Calling) เช่น ค้นหาเว็บ อ่านเขียนไฟล์ คิวรีฐานข้อมูล หรือยิง API</li>
            <li><strong>Agent Loop (วงจรการทำงานอัตโนมัติ):</strong> วนลูป <em>คิด → เลือกเครื่องมือ → ลงมือทำ → สังเกตผลลัพธ์</em> ซ้ำไปเรื่อยๆ จนกว่าจะบรรลุเป้าหมาย</li>
          </ol>
          <div class="flow"><span>รับเป้าหมายจากผู้ใช้</span><i>→</i><span>วางแผน (Plan)</span><i>→</i><span>เรียกใช้ Tool</span><i>→</i><span>ตรวจผลลัพธ์ (Observe)</span><i>↺</i><span>ทำซ้ำจนสำเร็จ</span></div>`
      },
      {
        id: 'prereq-before-mcp',
        h: 'พื้นฐานที่ต้องมีก่อนเรียน MCP (Model Context Protocol)',
        html: `
          <p>ก่อนจะใช้งานหรือเขียนระบบเชื่อมต่อด้วย <strong>MCP</strong> ให้เข้าใจง่ายที่สุด ควรมีพื้นฐานความเข้าใจเรื่องเหล่านี้ก่อน (ซึ่งคุณได้เรียนมาครบแล้วในระดับที่ 1 และ 2):</p>
          <ul>
            <li><strong>สถาปัตยกรรม Client-Server และ API:</strong> เข้าใจว่าโปรแกรมฝั่งผู้เรียก (Host / Client เช่น Claude Desktop หรือ IDE) ส่งคำขอไปหาโปรแกรมฝั่งผู้ให้บริการเครื่องมือ (MCP Server) อย่างไร</li>
            <li><strong>รูปแบบข้อมูล JSON:</strong> เพราะการส่งชื่อเครื่องมือ พารามิเตอร์ และผลลัพธ์ระหว่าง AI กับ MCP Server ใช้โครงสร้าง JSON Schema ทั้งหมด</li>
            <li><strong>Command Line & Environment Variables:</strong> เนื่องจาก MCP Server จำนวนมากรันผ่านคำสั่ง <code>npx</code>, <code>uvx</code> หรือ Docker และต้องตั้งค่า API Key ผ่าน Environment Variables</li>
          </ul>
          <pre><code>// ตัวอย่างโครงสร้าง JSON ที่บอก AI ว่ามี Tool อะไรให้เรียกใช้บ้าง
{
  "name": "query_sales_summary",
  "description": "ดึงสรุปยอดขายตามช่วงวันที่กำหนดจากฐานข้อมูล",
  "inputSchema": {
    "type": "object",
    "properties": {
      "startDate": { "type": "string", "description": "YYYY-MM-DD" },
      "endDate": { "type": "string", "description": "YYYY-MM-DD" }
    },
    "required": ["startDate", "endDate"]
  }
}</code></pre>`
      },
      {
        id: 'what-is-mcp',
        h: 'MCP คืออะไร? ทำไมถึงช่วยให้ AI ที่ใช้อยู่เก่งขึ้นแบบก้าวกระโดด',
        html: `
          <p>ในอดีต ถ้าเราอยากให้ AI เชื่อมต่อกับ Google Drive, GitHub, Slack หรือฐานข้อมูล PostgreSQL เราต้องเขียนโค้ดเชื่อมต่อแยกกันสำหรับแต่ละแอปและแต่ละโมเดล</p>
          <p><strong>MCP (Model Context Protocol)</strong> คือ <strong>มาตรฐานเปิด (Open Standard)</strong> ที่ทำหน้าที่เหมือน <strong>"พอร์ต USB-C สำหรับโลก AI"</strong> เพียงแค่มี MCP Server ของเครื่องมือนั้นๆ แอป AI ที่รองรับ MCP (เช่น Claude, Cursor, หรือ AI IDE ต่างๆ) ก็สามารถเสียบใช้งานข้อมูลและสั่งงานเครื่องมือนั้นได้ทันทีโดยไม่ต้องเขียนโค้ดเชื่อมต่อใหม่ตั้งแต่ศูนย์</p>`
      },
      {
        id: 'mcp-use-cases',
        h: '4 Use Cases ยอดนิยมในการจับคู่ MCP กับ Claude และ AI Coding Tools',
        html: `
          <table>
            <tr><th>Use Case</th><th>การทำงานเมื่อเชื่อมต่อผ่าน MCP</th></tr>
            <tr><td><strong>1. จัดการไฟล์และโปรเจกต์ในเครื่อง (Filesystem & Git MCP)</strong></td><td>ให้ AI อ่านโครงสร้างโปรเจกต์ ค้นหาไฟล์ แก้ไขโค้ด ตรวจสอบ Git Diff และสรุป Commit History จากเครื่องของเราโดยตรง</td></tr>
            <tr><td><strong>2. เชื่อมต่อฐานข้อมูลตรง (PostgreSQL / SQLite MCP)</strong></td><td>ให้ AI ตรวจสอบ Schema ของตาราง และช่วยเขียนพร้อมรันคำสั่ง SQL แบบ Read-only เพื่อวิเคราะห์ข้อมูลจริงโดยที่เราไม่ต้องก๊อปปี้ข้อมูลไปวางในแชท</td></tr>
            <tr><td><strong>3. ค้นคว้าและสั่งงานเว็บอัตโนมัติ (Browser / Fetch / Search MCP)</strong></td><td>ให้ AI เปิดหน้าเว็บจริงด้วย Puppeteer/Playwright เพื่อตรวจสอบหน้าตา UI, อ่าน Documentation ล่าสุด หรือดึงข้อมูลจากเว็บไซต์</td></tr>
            <tr><td><strong>4. เชื่อมระบบจัดการงานของทีม (GitHub / Notion / Slack MCP)</strong></td><td>สั่งให้ AI อ่านรายละเอียด Issue บน GitHub, สรุปเอกสาร Spec ใน Notion แล้วร่าง Pull Request หรือส่งสรุปเข้าห้องแชทของทีม</td></tr>
          </table>`
      },
      {
        id: 'guardrails',
        h: 'Technical Guardrails: การตั้งค่าสิทธิ์และตรวจสอบพารามิเตอร์ของ MCP Server',
        html: `
          <p>ในมุมของวิศวกรรมระบบ เมื่อเราเปิดให้ AI Agent เรียกใช้ Tool หรือ MCP Server ได้ เราต้องป้องกันในระดับโค้ดและโครงสร้างพื้นฐานดังนี้:</p>
          <ul>
            <li><strong>Database Role แบบ Least Privilege:</strong> หากต่อ MCP เข้ากับฐานข้อมูล PostgreSQL ห้ามใช้ <code>superuser</code> เด็ดขาด ให้สร้าง User แยกที่มีสิทธิ์เฉพาะ <code>GRANT SELECT ON ...</code> (Read-Only) และตั้งค่า <code>statement_timeout</code> ป้องกันคิวรีที่รันค้าง</li>
            <li><strong>Schema &amp; Path Validation:</strong> ในโค้ดฝั่ง MCP Server ต้องตรวจสอบพารามิเตอร์ด้วย JSON Schema / Zod ทุกครั้ง และจำกัดโฟลเดอร์ที่อนุญาตให้อ่านไฟล์ (Allowlist Directory) เพื่อป้องกันการเข้าถึงไฟล์นอกโปรเจกต์</li>
            <li><strong>Human-in-the-Loop Confirmation:</strong> สำหรับ Tool ที่มีการเปลี่ยนแปลงข้อมูล (<code>POST / PUT / DELETE</code> หรือการรันคำสั่ง Terminal) ต้องตั้งค่าให้รอรับสัญญาณยืนยันจากผู้ใช้ก่อนประมวลผลจริงเสมอ</li>
          </ul>
          <pre><code>-- ตัวอย่างการสร้าง Read-Only Role สำหรับให้ MCP Server เชื่อมต่อวิเคราะห์ข้อมูลอย่างปลอดภัย
CREATE ROLE mcp_readonly WITH LOGIN PASSWORD 'strong_secret_password';
GRANT CONNECT ON DATABASE app_production TO mcp_readonly;
GRANT USAGE ON SCHEMA public TO mcp_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO mcp_readonly;
ALTER ROLE mcp_readonly SET statement_timeout = '5s';</code></pre>`
      }
    ],
    quiz: [
      { q: 'สิ่งที่ทำให้ AI Agent แตกต่างจากแชทบอท LLM ทั่วไปมากที่สุดคืออะไร', options: ['มีขนาดไฟล์ใหญ่กว่า', 'สามารถวางแผนเป็นขั้นตอน เรียกใช้เครื่องมือภายนอก (Tools) และตรวจผลลัพธ์วนซ้ำจนงานเสร็จได้', 'ไม่ต้องเชื่อมต่ออินเทอร์เน็ต'], answer: 1, explain: 'AI Agent มีความสามารถในการวางแผนและเรียกใช้ Tools ในรูปแบบ Agent Loop เพื่อทำงานให้สำเร็จ' },
      { q: 'MCP (Model Context Protocol) เปรียบเทียบได้กับสิ่งใดในโลกฮาร์ดแวร์', options: ['การ์ดจอความเร็วสูง', 'พอร์ตมาตรฐาน USB-C ที่ช่วยให้แอป AI เชื่อมต่อกับแหล่งข้อมูลและเครื่องมือต่างๆ ได้ด้วยมาตรฐานเดียวกัน', 'โปรแกรมสแกนไวรัส'], answer: 1, explain: 'MCP เป็นมาตรฐานกลางที่ช่วยให้ AI เชื่อมต่อกับ Tools และฐานข้อมูลต่างๆ ได้โดยไม่ต้องเขียนตัวเชื่อมแยกกันทุกคู่' },
      { q: 'องค์ประกอบ 4 ส่วนสำคัญของระบบ AI Agent ได้แก่ข้อใด', options: ['Brain (LLM), Memory, Tools และ Agent Loop', 'เมาส์, คีย์บอร์ด, จอภาพ และลำโพง', 'HTML, CSS, รูปภาพ และฟอนต์'], answer: 0, explain: 'Agent ต้องมีสมองคิดวางแผน (Brain), ความจำ (Memory), เครื่องมือลงมือทำ (Tools) และวงจรทำงานซ้ำจนสำเร็จ (Agent Loop)' },
      { q: 'วงจรการทำงาน (Agent Loop) ของ Agentic AI มีลำดับอย่างไร', options: ['วางแผน (Plan) → เรียกใช้เครื่องมือ (Act / Tool Call) → ตรวจสอบผลลัพธ์ (Observe) → ปรับแผนทำต่อจนสำเร็จ', 'ตอบคำถามมั่วๆ ทันทีโดยไม่ตรวจผลลัพธ์', 'ปิดเครื่องทุกครั้งหลังรับคำสั่ง'], answer: 0, explain: 'การสังเกตผลลัพธ์จากการใช้เครื่องมือในแต่ละขั้นช่วยให้ Agent แก้ไขปัญหาเฉพาะหน้าและทำงานหลายขั้นตอนจนจบได้' },
      { q: 'ในการทำ Tool Calling (Function Calling) โมเดล AI รู้ได้อย่างไรว่ามีเครื่องมืออะไรให้เรียกใช้และต้องส่งพารามิเตอร์อะไรบ้าง', options: ['อ่านจากชื่อเครื่องมือ คำอธิบาย (description) และโครงสร้าง JSON Schema ที่นักพัฒนากำหนดไว้ให้', 'เดาชื่อฟังก์ชันขึ้นมาเองแบบสุ่ม', 'ถามผู้ใช้ทุกๆ 5 วินาที'], answer: 0, explain: 'JSON Schema และคำอธิบายที่ชัดเจนคือคู่มือที่ทำให้โมเดลเลือกใช้ Tool และส่งค่าพารามิเตอร์ได้ถูกต้อง' },
      { q: 'ความรู้พื้นฐานใดจากระดับที่ 1 และ 2 ที่จำเป็นมากเมื่อต้องตั้งค่าและใช้งาน MCP Server', options: ['ความเข้าใจเรื่อง Client-Server, โครงสร้างข้อมูล JSON และการใช้ Command Line / Environment Variables', 'การวาดภาพสีน้ำมัน', 'การประกอบโต๊ะทำงาน'], answer: 0, explain: 'MCP สื่อสารด้วย JSON ระหว่าง Client กับ Server และมักรันผ่านคำสั่ง CLI พร้อมตั้งค่า API Key ใน Environment Variables' },
      { q: 'หากเชื่อมต่อ PostgreSQL MCP Server เข้ากับ AI เพื่อช่วยวิเคราะห์ข้อมูลยอดขาย ควรตั้งค่าสิทธิ์ของฐานข้อมูลตามหลักความปลอดภัยอย่างไร', options: ['ใช้บัญชีฐานข้อมูลที่มีสิทธิ์เฉพาะการอ่าน (Read-Only) เพื่อป้องกันการเผลอลบหรือแก้ไขข้อมูลจริง', 'ใช้บัญชี Superuser ที่ลบตารางทั้งหมดได้โดยไม่ต้องถาม', 'ปิดรหัสผ่านฐานข้อมูลทั้งหมด'], answer: 0, explain: 'ตามหลัก Least Privilege ควรจำกัดสิทธิ์ของ Agent ให้เท่าที่จำเป็นต่องานเสมอ' },
      { q: 'หลักการ Human-in-the-Loop ในการออกแบบ AI Agent หมายถึงอะไร', options: ['การกำหนดให้การกระทำที่มีความเสี่ยงสูง (เช่น ลบไฟล์ โอนเงิน หรือส่งอีเมลหาลูกค้า) ต้องรอให้มนุษย์กดยืนยันอนุมัติก่อนเสมอ', 'การให้มนุษย์คิดเลขแทนคอมพิวเตอร์ทุกบรรทัด', 'การห้ามใช้คอมพิวเตอร์ในวันหยุด'], answer: 0, explain: 'งานที่ย้อนกลับไม่ได้หรือมีผลกระทบสูงต้องมีมนุษย์เป็นผู้ตรวจสอบและกดอนุมัติขั้นสุดท้ายเสมอ' },
      { q: 'ข้อใดคือตัวอย่างการใช้งาน Filesystem & Git MCP ร่วมกับ AI Coding Tool', options: ['ให้ AI ค้นหาไฟล์ในโปรเจกต์ อ่านโค้ดที่เกี่ยวข้อง ตรวจสอบ git diff และช่วยร่างข้อความ Commit จากเครื่องของเราโดยตรง', 'ใช้เพิ่มความเร็วสัญญาณ Wi-Fi ในบ้าน', 'ใช้ชาร์จแบตเตอรี่โน้ตบุ๊ก'], answer: 0, explain: 'Filesystem และ Git MCP ช่วยให้ AI เข้าถึงบริบทโปรเจกต์จริงในเครื่องได้อย่างเป็นระบบภายใต้ขอบเขตที่กำหนด' },
      { q: 'ทำไมจึงต้องระมัดระวังเมื่อให้ AI Agent อ่านข้อมูลจากเว็บไซต์หรือเอกสารภายนอกที่ไม่น่าเชื่อถือโดยตรง', options: ['เพราะข้อมูลภายนอกอาจแฝงคำสั่งหลอก Agent (Indirect Prompt Injection) ให้สั่งรันเครื่องมือไปในทางที่อันตรายได้', 'เพราะตัวอักษรบนเว็บอาจทำให้หน้าจอเป็นรอย', 'เพราะจะทำให้ฮาร์ดดิสก์หมุนเร็วเกินไป'], answer: 0, explain: 'Indirect Prompt Injection คือการซ่อนคำสั่งร้ายไว้ในข้อมูลที่ Agent ไปดึงมาอ่าน จึงต้องมี Guardrails และการจำกัดสิทธิ์เสมอ' }
    ]
  },

  {
    id: 'system-design-security',
    no: 12,
    level: 'advanced',
    category: 'Architecture',
    keyword: 'SCALE',
    subtitle: 'System Design & Security',
    tagline: 'รองรับผู้ใช้จำนวนมากอย่างปลอดภัย',
    title: 'System Design และ Cyber Security 101: Cache, Load Balancer, API Gateway และความปลอดภัย',
    summary: 'ความแตกต่างระหว่าง API Gateway กับ Load Balancer, ทำไมต้องใช้ Cache, และพื้นฐาน Cyber Security 101 สำหรับนักพัฒนา',
    why: 'AI เขียนโค้ดให้ทำงานได้ในเครื่องเรา แต่การออกแบบระบบให้รองรับคนนับแสนอย่างรวดเร็วและไม่ถูกโจมตี คือหน้าที่หลักของวิศวกรซอฟต์แวร์',
    minutes: 20,
    topics: ['API Gateway vs Load Balancer', 'Caching (Redis)', 'Cyber Security 101', 'OWASP & Prompt Injection'],
    sections: [
      {
        id: 'gateway-vs-lb',
        h: 'API Gateway vs Load Balancer: ต่างกันอย่างไร และทำงานร่วมกันอย่างไร',
        html: `
          <p>เมื่อระบบมีผู้ใช้งานจำนวนมาก เราไม่สามารถใช้เซิร์ฟเวอร์เครื่องเดียวรับศึกทั้งหมดได้ จึงต้องมีตัวกลางจัดการทราฟฟิก 2 ตัวที่นักพัฒนามักสับสนคือ <strong>Load Balancer</strong> และ <strong>API Gateway</strong>:</p>
          <div class="flow"><span>ผู้ใช้งาน (Clients)</span><i>→</i><span>API Gateway</span><i>→</i><span>Load Balancer</span><i>→</i><span>App Server × N</span></div>
          <table>
            <tr><th>หัวข้อเปรียบเทียบ</th><th>Load Balancer</th><th>API Gateway</th></tr>
            <tr><td><strong>หน้าที่หลัก</strong></td><td>กระจายปริมาณงาน (Traffic Distribution) ไปยังเซิร์ฟเวอร์หลายๆ เครื่องอย่างสมดุล และเช็กว่าเครื่องไหนล่ม (Health Check)</td><td>ประตูหน้าด่านของระบบ API จัดการเรื่องการยืนยันตัวตน (Auth), จำกัดจำนวนครั้งที่เรียก (Rate Limiting) และแยกเส้นทางไปแต่ละบริการ (Routing)</td></tr>
            <tr><td><strong>ระดับการทำงาน</strong></td><td>เน้นความเร็วและความเสถียรของเครือข่าย/เซิร์ฟเวอร์ (Layer 4 / Layer 7)</td><td>เน้นตรรกะระดับแอปพลิเคชันและการจัดการ API (Application Layer 7)</td></tr>
            <tr><td><strong>การใช้งานจริง</strong></td><td>ใช้คู่กันเสมอ โดย API Gateway ตรวจสิทธิ์และจัดการคำขอ ส่วน Load Balancer กระจายงานไปยังเครื่องเซิร์ฟเวอร์ย่อย</td><td>เป็นจุดเข้าออกเดียว (Single Entry Point) สำหรับแอปมือถือและหน้าเว็บ</td></tr>
          </table>`
      },
      {
        id: 'why-cache',
        h: 'ทำไมเวลาเข้าถึงข้อมูลแบบไวๆ ต้องใช้งาน Cache?',
        html: `
          <p>การอ่านข้อมูลจากฐานข้อมูลหลัก (ซึ่งเก็บอยู่บน Disk) มีความเร็วระดับ <strong>หลักสิบถึงหลักร้อยมิลลิวินาที (ms)</strong> และหากมีผู้ใช้เปิดหน้าสินค้ายอดนิยมพร้อมกัน 50,000 คน ฐานข้อมูลจะทำงานหนักจนค้างทันที</p>
          <p><strong>Cache (เช่น Redis หรือ Memcached)</strong> แก้ปัญหานี้ด้วยการนำข้อมูลที่ถูกเรียกซ้ำบ่อยๆ มาพักไว้ใน <strong>หน่วยความจำหลัก (RAM)</strong> ซึ่งอ่านข้อมูลได้เร็วระดับ <strong>ต่ำกว่า 1 มิลลิวินาที (Sub-millisecond)</strong></p>
          <ul>
            <li><strong>Cache Hit:</strong> ข้อมูลมีอยู่ใน Cache → ส่งกลับให้ผู้ใช้ทันที (เร็วมาก ไม่กวน Database)</li>
            <li><strong>Cache Miss:</strong> ข้อมูลยังไม่มีใน Cache → ไปดึงจาก Database มาส่งให้ผู้ใช้ พร้อมบันทึกเก็บไว้ใน Cache สำหรับคนถัดไป</li>
            <li><strong>TTL (Time-To-Live):</strong> การตั้งเวลาหมดอายุของข้อมูลใน Cache เช่น ตั้งไว้ 5 นาที เพื่อไม่ให้ผู้ใช้เห็นข้อมูลเก่าค้างนานเกินไป</li>
          </ul>`
      },
      {
        id: 'cyber-security-101',
        h: 'ปูพื้นฐาน Cyber Security 101 ที่นักพัฒนาทุกคนต้องรู้',
        html: `
          <p>พื้นฐานด้านความมั่นคงปลอดภัยไซเบอร์ตั้งอยู่บนหลักการ <strong>CIA Triad</strong> ได้แก่:</p>
          <ol>
            <li><strong>Confidentiality (ความลับ):</strong> ข้อมูลต้องเข้าถึงได้เฉพาะผู้มีสิทธิ์ เช่น การเข้ารหัสการสื่อสารด้วย HTTPS/TLS และการ Hash รหัสผ่านด้วย <code>bcrypt</code> หรือ <code>Argon2</code> (ห้ามเก็บรหัสผ่านเป็นข้อความธรรมดาเด็ดขาด)</li>
            <li><strong>Integrity (ความถูกต้องครบถ้วน):</strong> ข้อมูลต้องไม่ถูกแอบแก้ไขระหว่างทางหรือโดยผู้ไม่มีสิทธิ์</li>
            <li><strong>Availability (ความพร้อมใช้งาน):</strong> ระบบต้องพร้อมให้บริการ ไม่ล่มจากการถูกโจมตีแบบยิงทราฟฟิกถล่ม (DDoS) โดยป้องกันด้วย CDN, WAF และ Rate Limiting</li>
          </ol>`
      },
      {
        id: 'owasp-and-ai-security',
        h: 'ช่องโหว่ยอดฮิตของเว็บและระบบ AI ที่ต้องตรวจทุกครั้งก่อนขึ้น Production',
        html: `
          <table>
            <tr><th>ช่องโหว่</th><th>สาเหตุ</th><th>วิธีป้องกัน</th></tr>
            <tr><td><strong>SQL Injection</strong></td><td>นำข้อความจากผู้ใช้ไปต่อ String ในคำสั่ง SQL ตรงๆ</td><td>ใช้ Parameterized Queries / Prepared Statements เสมอ</td></tr>
            <tr><td><strong>XSS (Cross-Site Scripting)</strong></td><td>นำข้อความที่ผู้ใช้กรอกไปแสดงผลเป็น HTML/JS บนหน้าเว็บโดยไม่กรอง</td><td>Escape ข้อมูลก่อนแสดงผล และหลีกเลี่ยงการใช้ <code>innerHTML</code> กับข้อมูลจากผู้ใช้</td></tr>
            <tr><td><strong>Broken Access Control</strong></td><td>ซ่อนปุ่มบนหน้าเว็บแต่ไม่ได้ตรวจสิทธิ์ที่ฝั่ง Backend API</td><td>ตรวจสอบ Authentication และ Authorization ทุก Endpoint บน Server</td></tr>
            <tr><td><strong>Secret / API Key รั่วไหล</strong></td><td>เผลอเขียน API Key ไว้ในโค้ดฝั่ง Frontend หรือ Commit ไฟล์ <code>.env</code> ขึ้น GitHub</td><td>เก็บความลับไว้ใน Environment Variables ฝั่ง Server และใส่ <code>.env</code> ใน <code>.gitignore</code></td></tr>
          </table>`,
        sub: [
          {
            id: 'prompt-injection',
            h: 'การออกแบบสถาปัตยกรรมป้องกัน Prompt Injection ในระดับโค้ด',
            html: `
              <p>เมื่อระบบของเราต้องนำข้อความจากผู้ใช้หรือเอกสารภายนอกส่งเข้า LLM API เราต้องออกแบบชั้นป้องกันในโค้ดฝั่ง Backend ดังนี้:</p>
              <ul>
                <li><strong>แยกโครงสร้างข้อความด้วย Role และ Delimiter:</strong> แยก <code>system</code> message ออกจาก <code>user</code> message และครอบข้อมูลภายนอกด้วยแท็กชัดเจน (เช่น <code>&lt;untrusted_document&gt;...&lt;/untrusted_document&gt;</code>)</li>
                <li><strong>Output Schema Validation:</strong> บังคับให้ LLM ตอบกลับในรูปแบบ Structured Output (JSON Schema) แล้วตรวจด้วยไลบรารีอย่าง <code>Zod</code> หรือ <code>Pydantic</code> ก่อนส่งต่อให้ฟังก์ชันอื่น</li>
                <li><strong>ตั้งค่า Rate Limit &amp; Token Budget ที่ API Gateway:</strong> จำกัดจำนวนครั้งและขนาดข้อความที่ผู้ใช้ 1 คนสามารถเรียกใช้งาน AI Endpoint ได้ต่อนาที เพื่อป้องกันการยิงถล่มจนค่า API บานปลาย</li>
              </ul>`
          }
        ]
      },
      {
        id: 'next',
        h: 'ก้าวต่อไปหลังจากเรียนจบหลักสูตร (ครบทั้ง 12 บท)',
        html: `
          <p>เมื่อเข้าใจพื้นฐานวิศวกรรมซอฟต์แวร์ครบตั้งแต่การทำงานของเว็บ, โครงสร้างข้อมูล, Git, Frontend/Backend, ฐานข้อมูล, Unit Test ไปจนถึง LLM, RAG, MCP และ System Design &amp; Security แล้ว คุณมีความรู้ทางเทคนิคที่แข็งแรงพร้อมสร้างระบบจริงและต่อยอดสายงานเทคโนโลยีได้อย่างมั่นใจ!</p>
          <div class="note"><strong>แนะนำก้าวต่อไป:</strong> หมั่นฝึกฝนสร้างโปรเจกต์จริง ตรวจสอบโค้ดที่ AI สร้างขึ้นด้วยความเข้าใจ และติดตามบทความใหม่ๆ ได้ที่หน้า <a href="/articles"><strong>บทความและเกร็ดความรู้ →</strong></a></div>`
      }
    ],
    quiz: [
      { q: 'ทำไมการดึงข้อมูลจาก Cache (เช่น Redis) ถึงเร็วกว่าการดึงจากฐานข้อมูลหลักมาก', options: ['เพราะ Cache เก็บข้อมูลไว้ในหน่วยความจำหลัก (RAM) แทนการอ่านจาก Disk', 'เพราะ Cache ไม่ต้องเชื่อมต่อเครือข่าย', 'เพราะ Cache ลบข้อมูลทิ้งทุกวินาที'], answer: 0, explain: 'การอ่านข้อมูลจาก RAM มีความเร็วระดับ Sub-millisecond ซึ่งเร็วกว่าการคิวรีจาก Disk ของฐานข้อมูลหลายเท่า' },
      { q: 'หน้าที่หลักที่ API Gateway ทำได้นอกเหนือจากการกระจายโหลดของ Load Balancer ปกติคืออะไร', options: ['ช่วยเพิ่มขนาดฮาร์ดดิสก์ของเซิร์ฟเวอร์', 'เป็นประตูหน้าด่านที่จัดการเรื่องการยืนยันตัวตน (Auth), Rate Limiting และการแยกเส้นทาง API', 'ช่วยแปลงโค้ด Python เป็น C++'], answer: 1, explain: 'API Gateway จัดการเรื่อง Auth, Rate Limiting, Routing และนโยบายความปลอดภัยของ API ก่อนส่งต่อไปยังบริการย่อย' },
      { q: 'วิธีเก็บข้อมูลรหัสผ่านของผู้ใช้ในฐานข้อมูลที่ปลอดภัยตามหลัก Cyber Security คือข้อใด', options: ['เก็บเป็นข้อความปกติเพื่อง่ายต่อการตรวจสอบ', 'นำรหัสผ่านไปผ่านกระบวนการ Hash ด้วยอัลกอริทึมอย่าง bcrypt หรือ Argon2 ก่อนบันทึก', 'ซ่อนไว้ในโค้ดฝั่ง Frontend'], answer: 1, explain: 'รหัสผ่านต้องถูก Hash แบบทางเดียว (One-way Hashing) พร้อม Salt ด้วยอัลกอริทึมเช่น bcrypt หรือ Argon2 เสมอ' },
      { q: 'หน้าที่หลักของ Load Balancer ในระบบที่มีผู้ใช้งานจำนวนมากคืออะไร', options: ['กระจายทราฟฟิกคำขอไปยังเซิร์ฟเวอร์หลายๆ เครื่องอย่างสมดุล และเช็กสถานะว่าเครื่องไหนล่ม (Health Check)', 'ใช้เขียนโค้ดแทนโปรแกรมเมอร์', 'ใช้เก็บไฟล์วิดีโอทั้งหมดของบริษัท'], answer: 0, explain: 'Load Balancer ช่วยให้ระบบรองรับผู้ใช้จำนวนมากได้โดยไม่ให้เซิร์ฟเวอร์เครื่องใดเครื่องหนึ่งรับภาระหนักเกินไป' },
      { q: 'เหตุการณ์ที่ระบบค้นพบข้อมูลที่ต้องการอยู่ใน Cache พอดีโดยไม่ต้องเสียเวลาไปดึงจากฐานข้อมูลหลัก เรียกว่าอะไร', options: ['Cache Hit', 'Cache Miss', 'Server Crash'], answer: 0, explain: 'Cache Hit คือการเจอข้อมูลใน Cache ทันที ส่วน Cache Miss คือไม่เจอใน Cache จึงต้องไปดึงจาก Database' },
      { q: 'การกำหนดค่า TTL (Time-To-Live) ให้กับข้อมูลใน Cache มีจุดประสงค์เพื่ออะไร', options: ['กำหนดเวลาหมดอายุของข้อมูลใน Cache เพื่อป้องกันไม่ให้ผู้ใช้เห็นข้อมูลเก่าค้างนานเกินไป', 'กำหนดความเร็วพัดลมระบายความร้อน', 'ใช้ล็อกไม่ให้แอดมินเข้าสู่ระบบ'], answer: 0, explain: 'TTL ช่วยให้ข้อมูลใน Cache ถูกล้างและดึงข้อมูลใหม่จากฐานข้อมูลมาอัปเดตตามระยะเวลาที่เหมาะสม' },
      { q: 'หลักการ CIA Triad ในพื้นฐาน Cyber Security 101 ประกอบด้วยอะไรบ้าง', options: ['Confidentiality (ความลับ), Integrity (ความถูกต้องครบถ้วน), Availability (ความพร้อมใช้งาน)', 'CPU, Internet, Application', 'Code, Image, Audio'], answer: 0, explain: 'CIA Triad คือแกนหลัก 3 ด้านของการออกแบบระบบให้มีความมั่นคงปลอดภัยทางไซเบอร์' },
      { q: 'ช่องโหว่ XSS (Cross-Site Scripting) เกิดจากสาเหตุใด', options: ['การนำข้อความจากผู้ใช้ไปแสดงผลเป็น HTML/JavaScript บนหน้าเว็บโดยไม่ผ่านการกรองหรือ Escape', 'การตั้งรหัสผ่านยาวเกิน 12 ตัวอักษร', 'การใช้ฐานข้อมูล PostgreSQL'], answer: 0, explain: 'หากปล่อยให้ข้อความที่ผู้ใช้กรอกรันเป็นสคริปต์บนเบราว์เซอร์ของคนอื่นได้ ผู้โจมตีจะสามารถขโมย Session หรือข้อมูลสำคัญได้' },
      { q: 'หากต้องการป้องกันฟีเจอร์สำหรับแอดมินไม่ให้ผู้ใช้ทั่วไปเข้าถึง วิธีที่ปลอดภัยถูกต้องคือข้อใด', options: ['ตรวจสอบสิทธิ์ (Authorization) ที่ฝั่ง Backend API ทุกครั้ง ไม่ใช่แค่ซ่อนปุ่มกดบนหน้าเว็บ', 'แค่ใช้ CSS ซ่อนปุ่มแอดมินไว้ก็เพียงพอแล้ว', 'เปลี่ยนชื่อ URL เป็นภาษาอังกฤษยาวๆ โดยไม่ต้องเช็กสิทธิ์'], answer: 0, explain: 'การซ่อนปุ่มบนหน้าเว็บป้องกันการยิง API ตรงๆ ไม่ได้ จึงต้องตรวจสิทธิ์ที่ฝั่ง Server ทุกครั้งเพื่อป้องกัน Broken Access Control' },
      { q: 'ในการพัฒนาโปรเจกต์ เราควรจัดเก็บ API Key และความลับของระบบ (Secrets) ไว้อย่างไรจึงจะปลอดภัย', options: ['เก็บไว้ใน Environment Variables (.env) ฝั่ง Server และเพิ่มไฟล์ .env ลงใน .gitignore เพื่อไม่ให้หลุดขึ้น GitHub', 'เขียนใส่ไว้ในไฟล์หน้าบ้าน (Frontend) เพื่อให้เรียกใช้ง่าย', 'โพสต์เก็บไว้ใน README.md ของโปรเจกต์สาธารณะ'], answer: 0, explain: 'ความลับและ API Key ต้องถูกแยกออกจากซอร์สโค้ดด้วย Environment Variables และห้ามถูก Commit ขึ้น Git โดยเด็ดขาด' }
    ]
  }
];

export const SPEC_TEMPLATES: Record<string, { filename: string; content: string }> = {
  context: {
    filename: 'cntext.md',
    content: `# Project Context: [ชื่อโปรเจกต์]

## 1. เป้าหมายของโปรเจกต์
- แก้ปัญหาอะไรให้ใคร
- ผลลัพธ์หลักที่ผู้ใช้ได้รับคืออะไร

## 2. กลุ่มผู้ใช้งาน (Target Users)
- ผู้ใช้หลัก: ...
- ความคุ้นเคยทางเทคนิค: ...

## 3. ขอบเขตฟีเจอร์หลัก (Core Scope)
1. หน้าแรก (Overview)
2. หน้าแสดงข้อมูลหลัก
3. ระบบค้นหาและตัวกรอง

## 4. เทคโนโลยีที่ใช้ (Tech Stack)
- Frontend: Next.js (App Router) + TypeScript
- Styling: CSS Variables / Clean Editorial System
- Data / State: Structured Modules + localStorage`
  },
  design: {
    filename: 'Design.md',
    content: `# UI/UX Design Specification

## 1. แนวคิดการออกแบบ
- เรียบ สะอาดตา อ่านง่าย ไม่ใช้เอฟเฟกต์เรืองแสงหรือไอคอนรกตา
- แยกความสำคัญด้วยขนาดตัวอักษรและระยะห่าง (Whitespace)

## 2. ระบบสี (Light & Dark Mode)
- Primary Brand: #1E62D0
- Background: #FFFFFF (Light) / #0F1318 (Dark)
- Surface Border: #E6E8EC (Light) / #2A313B (Dark)

## 3. โครงสร้างแต่ละหน้า
- Navbar: โลโก้ซ้าย | เมนูกลางพร้อม Dropdown | ค้นหา & สวิตช์โหมดสีขวา
- หน้าบทความ: แบนเนอร์ 16:9 + เนื้อหาคอลัมน์ซ้าย 70% + สารบัญเกาะติดหน้าจอ 30%`
  },
  backlog: {
    filename: 'backlog.md',
    content: `# Product Backlog

## Phase 1: โครงสร้างหลักและระบบนำทาง
- [ ] BL-101: ตั้งค่า Next.js App Router และตัวแปรสี Light/Dark
- [ ] BL-102: สร้าง Navbar พร้อมเมนู Dropdown และหน้าต่างค้นหา

## Phase 2: หน้าเนื้อหาและฟีเจอร์หลัก
- [ ] BL-201: หน้าแรกและตารางเปรียบเทียบพื้นฐาน
- [ ] BL-202: หน้า Roadmap เรียงลำดับ Basic -> Intermediate -> Advanced
- [ ] BL-203: หน้าอ่านบทความพร้อมกล่องสารบัญ (Scroll-Spy TOC)

## เกณฑ์การตรวจรับงาน (Definition of Done)
- รันผ่าน \`npm run build\` โดยไม่มี TypeScript error
- แสดงผลได้ดีทั้งหน้าจอคอมพิวเตอร์และมือถือ`
  }
};

export interface ChecklistGroup {
  id: string;
  title: string;
  items: { id: string; text: string }[];
}

export const REVIEW_CHECKLIST: ChecklistGroup[] = [
  {
    id: 'security',
    title: '1. ความปลอดภัย (Security)',
    items: [
      { id: 'sec-1', text: 'ไม่มีการเอาค่าจากผู้ใช้ไปต่อกับคำสั่ง SQL หรือ Shell โดยตรง (ใช้ Parameterized Query เสมอ)' },
      { id: 'sec-2', text: 'ตรวจสิทธิ์ (Authorization) ฝั่ง Server ทุกครั้ง ไม่ใช่แค่ซ่อนปุ่มบนหน้าเว็บ' },
      { id: 'sec-3', text: 'ไม่มี API Key, รหัสผ่าน หรือ Secret ฮาร์ดโค้ดอยู่ในไฟล์ที่จะ commit' },
      { id: 'sec-4', text: 'ตรวจสอบและจำกัดรูปแบบข้อมูลขาเข้า (Input Validation) ทุก endpoint' }
    ]
  },
  {
    id: 'logic',
    title: '2. ความถูกต้องและกรณีขอบเขต (Logic & Edge Cases)',
    items: [
      { id: 'log-1', text: 'ทดสอบเมื่อข้อมูลเป็นค่าว่าง (null, undefined, array ว่าง) แล้วไม่พัง' },
      { id: 'log-2', text: 'ไลบรารีและฟังก์ชันที่ AI เรียกใช้มีอยู่จริงในเวอร์ชันปัจจุบัน (ไม่ถูกแต่งขึ้นเอง)' },
      { id: 'log-3', text: 'เมื่อเกิด Error จาก API หรือ Network มีการจัดการและแจ้งผู้ใช้ด้วยข้อความที่เข้าใจง่าย' },
      { id: 'log-4', text: 'ทำตามโจทย์ที่สั่งครบถ้วน และไม่ได้แอบลบฟีเจอร์เดิมที่ยังต้องใช้อยู่' }
    ]
  },
  {
    id: 'performance',
    title: '3. ประสิทธิภาพ (Performance)',
    items: [
      { id: 'perf-1', text: 'ไม่มีลูปซ้อนลูปหรือการยิงฐานข้อมูลในลูป (N+1 Query) โดยไม่จำเป็น' },
      { id: 'perf-2', text: 'รายการข้อมูลขนาดใหญ่มีการแบ่งหน้า (Pagination) หรือจำกัดจำนวนที่ดึง' },
      { id: 'perf-3', text: 'ไม่มีการสร้าง State หรือ useEffect ที่ทำให้หน้าเว็บ re-render ซ้ำไม่รู้จบ' }
    ]
  },
  {
    id: 'maintainability',
    title: '4. การดูแลรักษาต่อ (Maintainability)',
    items: [
      { id: 'maint-1', text: 'ชื่อตัวแปรและฟังก์ชันสื่อความหมายชัดเจน อ่านเข้าใจได้โดยไม่ต้องเดา' },
      { id: 'maint-2', text: 'อ่าน git diff ครบทุกบรรทัดและอธิบายได้ว่าโค้ดชุดนี้ทำงานอย่างไร' },
      { id: 'maint-3', text: 'มี Test คลุมพฤติกรรมหลักและกรณีที่อาจผิดพลาด' }
    ]
  }
];

