import React, { useState } from "react";
import { sendMail } from "../services/aboutMeService";
import { Github, Linkedin, Mail } from "lucide-react";

const AboutMePage = () => {
  const [language, setLanguage] = useState<string>("EN");
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMessage = `sender: ${sender} \nmessage: ${message}`;
    sendMail({ subject, message: finalMessage });

    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-text">
      {/* ABOUT */}
      <section className="space-y-6">
        <div className="space-y-2 flex items-center gap-8">
          <h1 className="text-3xl font-semibold tracking-tight">About Me</h1>
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.currentTarget.value)}
              className="border border-accent rounded-full px-2 py-1 text-sm text-black bg-white focus:outline-none"
            >
              <option value="TR">🇹🇷 Türkçe</option>
              <option value="EN">🇬🇧 English</option>
            </select>
          </div>
        </div>
        <div className="w-16 h-1 bg-accent rounded"></div>
        {language === "TR" ? (
          <div className="space-y-6">
            <section className="border rounded-xl p-5 bg-card">
              <p className="font-semibold text-lg">Yusuf Yüksek</p>
              <p className="text-sm text-gray-500">İstanbul/Turkey</p>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <a
                    href="mailto:yusufyuksek513@gmail.com"
                    className="flex gap-2 items-center text-accent hover:underline"
                  >
                    <Mail />
                    yusufyuksek513@gmail.com
                  </a>
                </p>

                <p>
                  <a
                    href="https://github.com/yuaud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center text-accent hover:underline"
                  >
                    <Github />
                    GitHub
                  </a>
                </p>

                <p>
                  <a
                    href="https://www.linkedin.com/in/yusuf-yüksek-759615226"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center text-accent hover:underline"
                  >
                    <Linkedin />
                    LinkedIn
                  </a>
                </p>
              </div>
            </section>

            <p className="leading-relaxed text-base text-gray-500">
              2026 yılında Bilgisayar Mühendisliği bölümünden mezun oldum. Web
              geliştirme alanında çalışıyorum ve ağırlıklı olarak backend,
              sistem mimarisi üzerine odaklanıyorum.
            </p>

            <p className="leading-relaxed text-base text-gray-500">
              Bu uygulamayı geliştirme sürecindeki temel motivasyonum, AWS
              altyapısı üzerinde gerçek bir production ortamı kurarak deployment
              süreçlerini uçtan uca öğrenmekti. Sadece teorik bilgiyle yetinmek
              yerine, gerçek bir uygulamayı production ortamına taşıyarak
              development ve production ortamları arasındaki farkları birebir
              deneyimlemeyi hedefledim.
            </p>

            <p className="leading-relaxed text-base text-gray-500">
              Proje konusu olarak Çalışan Yönetim Sistemi’ni seçmemin sebebi,
              ilişkisel veritabanı yapılarının yoğun olduğu bir mimari üzerinde
              çalışmak istememdi. Basit veri modelleri yerine; job, department,
              location ve employee gibi çoklu ilişkiler içeren, gerçek hayata
              daha yakın bir sistem tasarlamayı amaçladım. Bu sayede hem veri
              modelleme hem de sistem mimarisi açısından daha gerçekçi bir
              senaryo üzerinde çalışma imkânı buldum.
            </p>

            <p className="leading-relaxed text-base text-gray-500">
              Uygulamayı aktif olarak geliştirilmekteyim. Aşağıdaki iletişim
              alanı üzerinden bana geri bildirim, geliştirme önerileri ve teknik
              değerlendirmelerinizi paylaşabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <section className="border rounded-xl p-5 bg-card">
              <p className="font-semibold text-lg">Yusuf Yüksek</p>
              <p className="text-sm text-gray-500">İstanbul/Turkey</p>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <a
                    href="mailto:yusufyuksek513@gmail.com"
                    className="flex gap-2 items-center text-accent hover:underline"
                  >
                    <Mail />
                    yusufyuksek513@gmail.com
                  </a>
                </p>

                <p>
                  <a
                    href="https://github.com/yuaud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center text-accent hover:underline"
                  >
                    <Github />
                    GitHub
                  </a>
                </p>

                <p>
                  <a
                    href="https://www.linkedin.com/in/yusuf-yüksek-759615226"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center text-accent hover:underline"
                  >
                    <Linkedin />
                    LinkedIn
                  </a>
                </p>
              </div>
            </section>

            <p className="leading-relaxed text-base text-gray-500">
              I graduated from the Computer Engineering in 2026. I work in web
              development and mainly focus on backend and system architecture.
            </p>

            <p className="leading-relaxed text-base text-gray-500">
              My primary motivation in developing this application was to learn
              the deployment processes end-to-end by setting up a real
              production environment on the AWS infrastructure. Instead of just
              relying on theoretical knowledge, I aimed to experience the
              differences between development and production environments
              firsthand by deploying a real application to a production
              environment.
            </p>

            <p className="leading-relaxed text-base text-gray-500">
              I chose Employee Management Platform as my project topic because I
              wanted to work on an architecture heavily reliant on relational
              database structures. Instead of simple data models, I aimed to
              design a system closer to real life, containing multiple
              relationships such as job, department, location, and employee.
              This allowed me to work on a more realistic scenario in terms of
              both data modeling and system architecture.
            </p>

            <p className="leading-relaxed text-base text-gray-500">
              I am actively developing the application. You can share your
              feedback, development suggestions, and technical evaluations via
              the contact area below.
            </p>
          </div>
        )}
      </section>

      <div className="my-16 border-t"></div>

      {/* CONTACT */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="text-sm text-gray-500">
            {language === "TR" ? "Geri bildirim ve iletişim için formu kullanabilirsiniz." : "You can use the form for feedback and communication."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border rounded-xl p-6 space-y-5 shadow-sm"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Your Email</label>
            <input
              type="email"
              required
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Message</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            className="bg-accent text-white px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition self-start"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default AboutMePage;
