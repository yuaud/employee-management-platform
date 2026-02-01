import { useState } from "react";

const HomePage = () => {
  const [language, setLanguage] = useState<string>("EN");
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 text-text">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex gap-8">
          <h1 className="text-3xl font-semibold text-accent">
            Employee Management Platform
          </h1>
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
      </header>
      {language === "TR" ? (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
          <p>
            Şirket içi çalışanların yönetildiği bir otomasyon platformu.
          </p>
          {/* Auth */}
          <section className="border rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-medium">Erişim Modeli</h2>
            <p className="text-sm">
              Uygulama şirket içi kullanım için tasarlanmıştır.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Public üyelik yok</li>
              <li>Kullanıcılar sadece yetkili kişi tarafından oluşturulur</li>
            </ul>
          </section>

          {/* Test Account */}
          <section className="bg-green-100 text-black border rounded-lg p-4 space-y-2">
            <p className="font-semibold">Test Girişi</p>
            <p className="text-sm">
              Üye girişi yapılmadan özellikler devre dışıdır.
            </p>
            <p className="text-sm">
              Test amacıyla aşağıda paylaşılan public test hesabı ile giriş
              yapılmalıdır.
            </p>
            <p>
              <span className="font-semibold text-sm">Username: </span>test-user
            </p>
            <p>
              <span className="font-semibold text-sm">Password: </span> password
            </p>
          </section>

          {/* Jobs */}
          <section className="border rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-medium">Jobs</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <b>jobId:</b> Unique sistem kodu (örn: <code>HR_INTERN</code>)
              </li>
              <li>
                <b>jobTitle:</b> İnsan tarafından okunur başlık (örn:{" "}
                <i>Human Resources Intern</i>)
              </li>
              <li>Oluşturulan işler ile çalışanlar ilişkilendirilir</li>
            </ul>
          </section>

          {/* Locations */}
          <section className="border rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-medium">Locations</h2>
            <p className="text-sm">
              Konumlar çalışanlar için değil, departmanlar içindir.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Country</li>
              <li>City</li>
              <li>Postal Code</li>
              <li>Street Address</li>
            </ul>
            <p className="text-sm">
              Bir departman oluşturmak için mevcut bir location ile
              ilişkilendirilmesi gerekir.
            </p>
          </section>

          {/* Departments */}
          <section className="border rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-medium">Departments</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <b>Department Name:</b> Örn: IT Department
              </li>
              <li>
                <b>Location:</b> Departmanın bağlı olduğu konum
              </li>
              <li>Çalışanlar oluşturulan departmanlarla ilişkilendirilir</li>
            </ul>
          </section>

          {/* Employees */}
          <section className="border rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-medium">Employees</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                Kişisel bilgiler: Fotoğraf, İsim, Soyisim, Telefon numarası,
                Email, Maaş, İşe giriş tarihi
              </li>
              <li>Job ve Department ile ilişkilendirme</li>
              <li>Manager atanabilir</li>
              <li>Çalışan yönetici yapılabilir</li>
              <li>Info panelinden detaylı görünüm</li>
              <li>
                Job history Info panelinden eklenebilir (şirket adı,
                başlangıç/bitiş tarihi)
              </li>
            </ul>
          </section>

          {/* Cards */}
          <section className="border rounded-lg p-4 space-y-3">
            <h2 className="text-xl font-medium">Card Sistemi</h2>

            <div className="space-y-2 text-sm">
              <p>
                <b>Info:</b> Detaylı bilgi ekranı
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <b>Job:</b> Oluşturulma/güncellenme tarihi, çalışan sayısı,
                  çalışan listesi
                </li>
                <li>
                  <b>Location:</b> Location bilgileri, bağlı departmanlar
                </li>
                <li>
                  <b>Department:</b> Çalışan sayısı, location bilgileri, çalışan
                  listesi
                </li>
                <li>
                  <b>Employee:</b> Manager bilgisi, yöneticisi olduğu çalışanlar listesi, job
                  history
                </li>
              </ul>

              <p>
                <b>Edit:</b> Sadece değiştirilen alanlar güncellenir
              </p>

              <p>
                <b>Delete:</b> İlişki kontrolü yapılır
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Job → Çalışanı varsa silinemez</li>
                <li>Location → Departmanı varsa silinemez</li>
                <li>Department → Çalışanı varsa silinemez</li>
                <li>
                  Employee → Ön koşulsuz silinebilir, manager ilişkileri boşa
                  düşer
                </li>
              </ul>
            </div>
          </section>
        </div>
      ) : (
        /* EN */
        <div className="max-w-5xl mx-auto p-6 space-y-8">
          <p>
            An automation platform for managing internal company employees.
          </p>
          {/* Auth */}
          <section className="border rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-medium">Access Model</h2>
            <p className="text-sm">
              The application is designed for internal company use
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>No public membership available</li>
              <li>Users can only be created by authorized personnel.</li>
            </ul>
          </section>

          {/* Test Account */}
          <section className="bg-green-100 text-black border rounded-lg p-4 space-y-2">
            <p className="font-semibold">To log in for testing</p>
            <p className="text-sm">
              Features are disabled without logging in as a user
            </p>
            <p className="text-sm">
              For testing purposes, please log in using the public test account
              shared below.
            </p>
            <p>
              <span className="font-semibold text-sm">Username: </span>test-user
            </p>
            <p>
              <span className="font-semibold text-sm">Password: </span>password
            </p>
          </section>

          {/* Jobs */}
          <section className="border rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-medium">Jobs</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <b>jobId:</b> Unique system code (e.g. <code>HR_INTERN</code>)
              </li>
              <li>
                <b>jobTitle:</b> Human-readable title (e.g.:{" "}
                <i>Human Resources Intern</i>)
              </li>
              <li>
                Employees are assigned to the jobs that have been created.
              </li>
            </ul>
          </section>

          {/* Locations */}
          <section className="border rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-medium">Locations</h2>
            <p className="text-sm">
              Locations are for departments, not for employees.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Country</li>
              <li>City</li>
              <li>Postal Code</li>
              <li>Street Address</li>
            </ul>
            <p className="text-sm">
              To create a department, it needs to be associated with an existing
              location
            </p>
          </section>

          {/* Departments */}
          <section className="border rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-medium">Departments</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <b>Department Name:</b> e.g. IT Department
              </li>
              <li>
                <b>Location:</b> The location to which the department is
                affiliated
              </li>
              <li>
                Employees are assigned to the departments that have been
                created.
              </li>
            </ul>
          </section>

          {/* Employees */}
          <section className="border rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-medium">Employees</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                Personal Informations: Photo, Name, Surname, Phone number,
                Email, Salary, Hire Date
              </li>
              <li>Associating with Job and Department</li>
              <li>A manager can be assigned</li>
              <li>An employee can be assigned as a manager</li>
              <li>Detailed view from Info panel</li>
              <li>
                Job history can be added from Info panel (Company name,
                start/end date)
              </li>
            </ul>
          </section>

          {/* Cards */}
          <section className="border rounded-lg p-4 space-y-3">
            <h2 className="text-xl font-medium">Card View</h2>

            <div className="space-y-2 text-sm">
              <p>
                <b>Info:</b> Detailed information panel
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <b>Job:</b> Creation/update date, number of employees,
                  employee list
                </li>
                <li>
                  <b>Location:</b> Location information, affiliated departments
                </li>
                <li>
                  <b>Department:</b> Number of employees, location information,
                  employee list
                </li>
                <li>
                  <b>Employee:</b> Manager information, list of employees he/she manages,
                  job history
                </li>
              </ul>

              <p>
                <b>Edit:</b> Only the modified fields are updated.
              </p>

              <p>
                <b>Delete:</b> Relationship control is performed.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Job → It cannot be deleted if it has employees.</li>
                <li>Location → It cannot be deleted if it has departments.</li>
                <li>Department → It cannot be deleted if it has employees.</li>
                <li>
                  Employee → Can be deleted without preconditions, manager
                  relationships becomes null and void.
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default HomePage;
