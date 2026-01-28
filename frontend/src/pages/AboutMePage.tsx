import React, { useState } from "react";
import { sendMail } from "../services/aboutMeService";

const AboutMePage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendMail({subject, message});
    console.log({ subject, message });

    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10 text-text">
      {/* ABOUT ME */}
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">About Me</h1>

        <p className="leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eros
          justo, gravida a urna in, ultricies convallis enim. Mauris id massa at
          augue venenatis imperdiet. Aliquam mauris orci, vulputate vehicula
          magna vel, pharetra ultricies risus. Nunc id facilisis augue.
          Suspendisse eu leo sed mauris molestie feugiat non in ligula. Ut non
          feugiat arcu. Maecenas vitae ultrices massa. Etiam scelerisque lacus
          sit amet lorem dignissim tempus. Nulla eu aliquam ipsum. Nullam
          viverra lacinia ipsum varius imperdiet. Aenean et libero sed orci
          vehicula accumsan. Nulla ante tortor, posuere sit amet velit ut,
          euismod posuere mi. Duis ut ex gravida, convallis velit id, accumsan
          nulla. Praesent gravida ut nisl a viverra. Sed ut lacus neque. Ut
          tempor aliquet tortor, in pretium enim blandit vel. Ut et elit auctor,
          accumsan urna ut, porta libero. Mauris vehicula vitae lorem sed
          sagittis. Vivamus lacinia ac elit eu bibendum. Integer a dolor in elit
          sodales lacinia. Aliquam sollicitudin purus mauris, placerat rhoncus
          velit vulputate at. Mauris vel pretium felis. Suspendisse ac lacus
          interdum, malesuada massa sit amet, congue orci. Nullam ac suscipit
          nunc, eget laoreet purus. Nunc euismod dignissim enim ac fringilla.
          Vestibulum egestas, lorem non pulvinar elementum, mi nisi rhoncus dui,
          egestas ullamcorper neque nunc sit amet ipsum.
        </p>
      </section>

      {/* CONTACT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Send Me a Mail</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-card p-6 rounded-lg border"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Message</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="border rounded px-3 py-2 focus:outline-none focus:ring"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            className="self-start bg-black text-white px-5 py-2 rounded hover:opacity-90"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
};

export default AboutMePage;
