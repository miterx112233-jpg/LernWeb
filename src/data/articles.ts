import { LessonSection } from './lessons';

export type ArticleCategory = 'AI Workflow' | 'Case Study' | 'Career & Skills' | 'Tech Explainer';

export interface Article {
  slug: string;
  category: ArticleCategory;
  keyword: string;
  subtitle: string;
  tagline: string;
  title: string;
  summary: string;
  publishedAt: string;
  minutes: number;
  sections: LessonSection[];
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'AI Workflow',
  'Case Study',
  'Career & Skills',
  'Tech Explainer'
];

/* =====================================================================
   ข้อมูลหน้า "บทความ" (/articles) — แยกออกจากบทเรียนหลัก 12 บทใน Roadmap
   สามารถเพิ่มบทความใหม่ต่อท้ายใน ARTICLES ได้ตลอดเวลา
   ===================================================================== */
export const ARTICLES: Article[] = [
  {
    slug: 'llm-for-business-and-developers',
    category: 'Tech Explainer',
    keyword: 'LLM',
    subtitle: 'Large Language Model',
    tagline: 'คืออะไร? ช่วยในงานธุรกิจได้อย่างไร',
    title: 'Large Language Model (LLM) คืออะไร? ทำไมธุรกิจและคนทำงานยุคใหม่ควรเข้าใจ',
    summary: 'สรุปภาพรวมของ LLM และ Generative AI สำหรับคนทำงานและภาคธุรกิจ พร้อมกรณีศึกษาการนำไปใช้งานจริง',
    publishedAt: '4 พ.ย. 2026',
    minutes: 8,
    sections: [
      {
        id: 'intro',
        h: 'Large Language Model หรือ LLM คืออะไร',
        html: `
          <p><strong>Large Language Model (LLM)</strong> คือโมเดลภาษาขนาดใหญ่ที่ผ่านการเรียนรู้จากข้อความจำนวนมาก ทำให้สามารถสรุป แปล ร่างเอกสาร และช่วยเขียนโค้ดได้ใกล้เคียงมนุษย์</p>
          <p>หากต้องการศึกษาเชิงเทคนิคสำหรับนักพัฒนาโดยเฉพาะ สามารถดูเพิ่มเติมได้ใน <a href="/lesson/llm">บทเรียนที่ 09 ของแผนผัง Roadmap</a></p>`
      },
      {
        id: 'business-impact',
        h: 'LLM เกี่ยวข้องกับงานและธุรกิจอย่างไร?',
        html: `
          <ul>
            <li><strong>ลดเวลาทำงานเอกสารซ้ำๆ:</strong> สรุปรายงานการประชุม ร่างอีเมล และค้นหาข้อมูลจากคู่มือภายใน</li>
            <li><strong>ยกระดับการบริการลูกค้า:</strong> ตอบคำถามเบื้องต้นได้ตลอด 24 ชั่วโมงโดยอ้างอิงจากฐานข้อมูลขององค์กร</li>
            <li><strong>ช่วยทีมพัฒนาซอฟต์แวร์:</strong> ร่างโค้ดต้นแบบ เขียนชุดทดสอบ และช่วยอธิบายโค้ดเก่า</li>
          </ul>`
      },
      {
        id: 'caution',
        h: 'ข้อควรระวังก่อนนำมาใช้งานจริง',
        html: `
          <div class="note note--warn">ไม่ควรนำข้อมูลความลับของลูกค้าหรือรหัสผ่านภายในองค์กรไปป้อนในระบบ AI สาธารณะ และควรมีคนตรวจสอบผลลัพธ์ก่อนนำไปใช้งานจริงเสมอ</div>`
      }
    ]
  },
  {
    slug: 'why-ai-fixes-break-more-code',
    category: 'AI Workflow',
    keyword: 'CONTEXT',
    subtitle: 'Why AI Loops on Bugs',
    tagline: 'ทำไมยิ่งให้ AI แก้บั๊ก โค้ดยิ่งพัง?',
    title: 'ทำไมยิ่งสั่ง AI แก้บั๊ก โค้ดยิ่งพัง? รู้จักอาการหลุดบริบทและวิธีรับมือ',
    summary: 'เมื่อสั่งแก้ไปมาหลายรอบแล้ว AI เริ่มลบฟีเจอร์เดิมหรือวนกลับมาแก้แบบเดิม เกิดจากอะไรและควรตัดวงจรอย่างไร',
    publishedAt: '4 พ.ย. 2026',
    minutes: 6,
    sections: [
      {
        id: 'symptom',
        h: 'อาการที่คนใช้ AI เขียนโค้ดเจอกันทุกคน',
        html: `
          <p>ช่วงแรกที่เริ่มสร้างฟีเจอร์ AI มักเขียนโค้ดออกมาได้เร็วมาก แต่พอมีบั๊กซับซ้อนแล้วเราพิมพ์แค่ <em>"ยังพังอยู่ แก้ให้หน่อย"</em> ซ้ำๆ 4–5 รอบ โค้ดมักเริ่มเละและกระทบส่วนอื่นที่เคยทำงานได้</p>`
      },
      {
        id: 'cause',
        h: 'สาเหตุ: Context ยาวเกินไปและขาดการวิเคราะห์ต้นเหตุ',
        html: `
          <ol>
            <li><strong>ประวัติการคุยที่ผิดพลาดสะสมอยู่ใน Context:</strong> ยิ่งคุยยาว โมเดลยิ่งได้รับโค้ดเวอร์ชันที่ผิดปะปนอยู่ในบทสนทนา</li>
            <li><strong>เดาวิธีแก้โดยไม่ดูค่าจริง:</strong> ถ้าเราไม่ส่ง Error message หรือค่าตัวแปรจริงให้ดู AI จะสุ่มแก้ไปเรื่อยๆ</li>
          </ol>`
      },
      {
        id: 'solution',
        h: 'วิธีแก้ไขที่ใช้ได้ผลจริง',
        html: `
          <ul>
            <li>ใช้ <code>git diff</code> หรือ <code>git restore</code> ย้อนกลับไปจุดที่โค้ดยังสะอาดก่อน</li>
            <li>เปิดบทสนทนาใหม่ (Clear Context) แล้วส่งเฉพาะไฟล์ที่เกี่ยวข้องพร้อม Error บรรทัดที่เกิดปัญหา</li>
            <li>ให้ AI อธิบายสมมติฐานก่อนลงมือแก้โค้ดจริง</li>
          </ul>`
      }
    ]
  },
  {
    slug: 'junior-dev-skills-in-ai-era',
    category: 'Career & Skills',
    keyword: 'CAREER',
    subtitle: 'Junior Developer in AI Era',
    tagline: 'ทักษะที่บริษัทยังมองหาจากคนรุ่นใหม่',
    title: 'ในวันที่ AI เขียนโค้ดได้ บริษัทยังมองหาอะไรจาก Junior Developer?',
    summary: 'เมื่อการพิมพ์โค้ดพื้นฐานไม่ใช่ข้อได้เปรียบอีกต่อไป อะไรคือสิ่งที่ทำให้ผู้สมัครงานโดดเด่นในการสัมภาษณ์และทำงานจริง',
    publishedAt: '4 พ.ย. 2026',
    minutes: 7,
    sections: [
      {
        id: 'shift',
        h: 'สิ่งที่เปลี่ยนไปในการคัดเลือกคนเข้าทีม',
        html: `
          <p>แต่ก่อนการสร้างเว็บ CRUD ขึ้นมาหนึ่งเว็บอาจใช้เป็นโปรเจกต์จบได้ แต่ทุกวันนี้ใครก็สั่ง AI สร้างได้ในไม่กี่นาที ผู้สัมภาษณ์จึงเปลี่ยนมาดูว่า <strong>คุณเข้าใจโค้ดที่คุณส่งมาแค่ไหน</strong></p>`
      },
      {
        id: 'what-matters',
        h: '3 สิ่งที่ทำให้โดดเด่นกว่าคนอื่น',
        html: `
          <ol>
            <li><strong>อธิบายเหตุผลเบื้องหลังการตัดสินใจได้:</strong> ทำไมเลือกโครงสร้างตารางแบบนี้ ถ้ามีคนเข้าใช้งานพร้อมกันมากๆ จุดไหนจะคอขวด</li>
            <li><strong>ไล่หาปัญหา (Debugging) อย่างเป็นระบบ:</strong> เมื่อโปรแกรมไม่ทำงาน เริ่มตรวจจาก Network, Log หรือ Database ก่อน</li>
            <li><strong>รับผิดชอบต่อคุณภาพโค้ด:</strong> มีการเขียน Test ตรวจช่องโหว่พื้นฐาน และไม่ส่งโค้ดที่ตัวเองยังไม่อ่านเข้าทีม</li>
          </ol>`
      }
    ]
  }
];

