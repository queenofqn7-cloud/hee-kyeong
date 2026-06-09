import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Upload,
  User,
  Check,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  FileText,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Sparkle,
  Settings,
  HelpCircle,
  TrendingUp,
  Inbox
} from "lucide-react";

// Google Form Link constants as requested by the user
const formLinks = {
  educationApplication: "https://forms.gle/EDUCATION_APPLICATION_FORM",
  lectureBooking: "https://forms.gle/LECTURE_BOOKING_FORM",
  profileRequest: "https://forms.gle/PROFILE_REQUEST_FORM",
  corporateTraining: "https://forms.gle/CORPORATE_TRAINING_FORM",
};

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Drag and drop / local file upload for instructor photo preview
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800"
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Playful Interactive States for Simulated Inquiry Form
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    contact: "",
    message: "",
  });
  const [submittedInquiries, setSubmittedInquiries] = useState<Array<typeof formData & { id: number; date: string }>>([]);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processPhoto(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processPhoto(files[0]);
    }
  };

  const processPhoto = (file: File) => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name && !formData.message) return;
    
    // Simulate inquiry submission
    const newInquiry = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    };

    setSubmittedInquiries([newInquiry, ...submittedInquiries]);
    setShowSuccessToast(true);
    setFormData({ name: "", organization: "", contact: "", message: "" });

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen font-sans transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
        
        {/* Subtle AI Grid background decoration from theme */}
        <div className="absolute inset-0 pointer-events-none ai-grid-pattern opacity-10 dark:opacity-20" />

        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shrink-0 shadow-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20" id="header-container">
              
              {/* Logo / Left Brand */}
              <div className="flex items-center gap-3">
                <a href="#home" id="main-logo" className="flex items-center gap-2.5 group">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform duration-200">
                    H
                  </div>
                  <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white transition-colors duration-200">
                    한희경강사
                  </span>
                </a>
              </div>

              {/* Desktop Menu links as instructed */}
              <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-350">
                <a href="#home" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-350 transition-colors">홈</a>
                <a href="#introduction" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">강사소개</a>
                <a href="#modality" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">교육방식</a>
                <a href="#curriculum" className="hover:text-hover hover:text-blue-600 dark:hover:text-blue-400 transition-colors">교육내용</a>
                <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">교육문의</a>
              </div>

              {/* Top Menu CTA / Theme Toggles */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Theme toggle */}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2.5 rounded-xl text-slate-500 dark:text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                  aria-label="테마 전환"
                  id="theme-toggle-desktop"
                >
                  {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Accent Highlight Button */}
                <a
                  href={formLinks.educationApplication}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="nav-cta-button"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold border border-transparent hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-lg shadow-blue-250 dark:shadow-none text-sm"
                >
                  교육신청하기
                </a>
              </div>

              {/* Mobile menu and theme triggers */}
              <div className="flex md:hidden items-center space-x-2">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                  aria-label="테마 전환"
                >
                  {isDark ? <Sun className="w-5 h-4.5 text-yellow-400" /> : <Moon className="w-5 h-4.5" />}
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                  aria-label="메뉴 토글"
                  id="mobile-menu-toggle"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </div>

          {/* Mobile Navigation Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-white dark:bg-[#0c1220] border-b border-slate-200 dark:border-slate-800 overflow-hidden"
                id="mobile-menu-dropdown"
              >
                <div className="px-6 py-4 space-y-2">
                  <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-base font-semibold text-slate-755 dark:text-slate-200 hover:text-blue-600">홈</a>
                  <a href="#introduction" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-base font-semibold text-slate-755 dark:text-slate-200 hover:text-blue-600">강사소개</a>
                  <a href="#modality" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-base font-semibold text-slate-755 dark:text-slate-200 hover:text-blue-600">교육방식</a>
                  <a href="#curriculum" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-base font-semibold text-slate-755 dark:text-slate-200 hover:text-blue-600">교육내용</a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-base font-semibold text-slate-755 dark:text-slate-200 hover:text-blue-600">교육문의</a>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href={formLinks.educationApplication}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-5 py-3 rounded-full bg-blue-600 text-white font-bold text-sm tracking-wide shadow-md"
                    >
                      교육신청하기
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content container following layout structure of Professional Polish */}
        <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
          
          {/* Top segment: Left (Hero & curriculum quick card summary) & Right (Profile frame) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="home">
            
            {/* Hero Main Block (Left) - 7 cols */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-150 dark:border-slate-850 flex-1 relative overflow-hidden transition-colors duration-350">
                {/* Custom AI Pattern overlay as described in instructions */}
                <div className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none text-blue-600 dark:text-blue-400">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M10 50 L90 50 M50 10 L50 90" strokeWidth="1" />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full mb-5 tracking-wider">
                      GENERATIVE AI EXPERT
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2 tracking-tight">
                      한희경강사
                    </h1>
                    
                    <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                      비전공자도 이해하는 실전 AI 교육전문가
                    </p>

                    <p className="text-slate-650 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                      ChatGPT와 AI 활용법을 쉽고 실전 중심으로 전달합니다.<br/>
                      공공기관 및 대학 대상 AI 교육 전문 강사 한희경입니다.
                    </p>
                  </div>

                  {/* Buttons with standard target settings */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <a
                      href={formLinks.educationApplication}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold hover:scale-[1.01] active:scale-[0.99] transition-all text-center shadow-xl shadow-blue-100 dark:shadow-none"
                    >
                      교육신청하기
                    </a>
                    <a
                      href={formLinks.profileRequest}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-white dark:bg-slate-900 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500 rounded-2xl font-bold hover:bg-blue-50/50 dark:hover:bg-slate-800/50 text-center hover:scale-[1.01] active:scale-[0.99] transition-all"
                    >
                      강사프로필요청하기
                    </a>
                  </div>
                </div>
              </div>

              {/* Education Contents cards inline under left block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="curriculum">
                
                {/* ChatGPT - core presentation themes from Polish Theme style */}
                <div className="bg-blue-600 dark:bg-blue-700 rounded-3xl p-6 text-white shadow-lg flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold tracking-wider">
                      THEME 01
                    </div>
                    <h3 className="text-xl font-bold">ChatGPT</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      ChatGPT를 이해하고 업무와 교육 현장에서 즉시 활용하는 실전적인 교육 내용을 다룹니다.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs font-bold text-white/90">
                    <span>교육 과정 문의</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* AI 활용법 theme card */}
                <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-colors">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold tracking-wider">
                      THEME 02
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">AI 활용법</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      생성형 AI를 실무에 적용하는 핵심 기본 활용 방향을 체계적으로 알기 쉽게 다룹니다.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                    <span>기본 방향 수단 분석</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column Custom Profile box & Quick Inquiry interactive elements - 5 cols */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Profile Image card box + drop uploader trigger */}
              <div className={`h-[365px] bg-slate-200 dark:bg-slate-900 rounded-3xl relative overflow-hidden border-2 shadow-md group transition-all duration-300 ${isDragging ? "border-blue-500 scale-[1.02] bg-blue-50/30 dark:bg-blue-950/20" : "border-slate-200 dark:border-slate-800"}`}>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileSelect}
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {photoUrl ? (
                    <>
                      <img
                        src={photoUrl}
                        alt="한희경 강사 이미지"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* Interactive overlay with helpful guide */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-600/90 flex items-center justify-center mb-3">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-extrabold mb-1.5">강사 프로필 사진 교체</span>
                        <p className="text-xs text-slate-300 max-w-[200px] leading-relaxed">
                          대화방에 업로드하신 강사님의 얼굴 사진 파일을 여기에 마우스로 끌어놓거나(Drag & Drop) 클릭하여 즉시 교체하세요!
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-6 text-center">
                      <svg className="w-16 h-16 mb-2 opacity-20 text-slate-650 dark:text-slate-205" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-655 dark:text-slate-300">강사 프로필 이미지 (클릭/드롭)</span>
                      <span className="text-[11px] text-slate-450 dark:text-slate-500 mt-1">로컬 가상 사진 보기 뷰어 지원</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white pointer-events-none">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Instructor Profile</p>
                  <p className="text-base sm:text-lg font-semibold text-white">공공기관 · 대학 전문 AI 교육 한희경 강사</p>
                </div>
              </div>

              {/* Education Inquiry Section Interactive Card */}
              <div className="flex-1 bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-sm border border-slate-150 dark:border-slate-850 flex flex-col justify-between transition-colors" id="contact">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">가상 상담 및 섭외 요청</h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-normal">
                    예시 폼에 테스트 문의 내용을 적어 즉각적인 모의 접수 피드를 체험해 보세요.
                  </p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        required
                        type="text"
                        placeholder="이름"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-10 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-xs px-4"
                      />
                      <input
                        required
                        type="text"
                        placeholder="소속"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="h-10 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-xs px-4"
                      />
                    </div>
                    
                    <input
                      required
                      type="text"
                      placeholder="연락처"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full h-10 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-xs px-4"
                    />

                    <textarea
                      required
                      rows={2}
                      placeholder="문의 내용을 입력해 주세요."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-xs p-3 resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-950 dark:bg-blue-600 dark:hover:bg-blue-750 text-white rounded-xl text-center text-xs font-bold transition-all"
                    >
                      테스트 가상 등록
                    </button>
                  </form>
                </div>

                {/* Sub links grid strictly based on the requested links */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={formLinks.lectureBooking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 bg-slate-105 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-center text-xs font-semibold select-none transition-colors"
                  >
                    강연섭외문의하기
                  </a>
                  <a
                    href={formLinks.corporateTraining}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 bg-slate-105 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-center text-xs font-semibold select-none transition-colors"
                  >
                    기업교육문의하기
                  </a>
                </div>

              </div>

            </div>

          </div>

          <AnimatePresence>
            {showSuccessToast && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-4 bg-emerald-600 text-white rounded-2xl shadow-md max-w-xl mx-auto flex items-center gap-3"
              >
                <Check className="w-5 h-5 shrink-0" />
                <div className="text-xs font-bold">가상 문의가 로컬 등록되었습니다. 정보는 안전하게 보관됩니다.</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Simulation list if content has items */}
          {submittedInquiries.length > 0 && (
            <div className="bg-slate-100/60 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 max-w-4xl mx-auto">
              <h4 className="text-xs font-bold text-slate-500 mb-3 tracking-wider">실시간 로컬 접수 체험 리스트 ({submittedInquiries.length})</h4>
              <div className="space-y-2.5 max-h-[160px] overflow-y-auto">
                {submittedInquiries.map((iq) => (
                  <div key={iq.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 flex justify-between items-start gap-4">
                    <div className="text-xs">
                      <div className="font-bold text-slate-800 dark:text-white">{iq.name} ({iq.organization})</div>
                      <div className="text-slate-500 dark:text-slate-400 mt-1">{iq.message}</div>
                    </div>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{iq.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructor profile detailed section */}
          <section id="introduction" className="bg-white dark:bg-[#111827] rounded-3xl p-8 sm:p-12 border border-slate-150 dark:border-slate-850/80 transition-colors">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">GUEST SPEAKER</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">강사소개</h3>
              <div className="w-10 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-4 rounded-full" />
              <p className="mt-6 text-slate-650 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                한희경강사는 생성형 AI 활용 교육을 진행하는 교육 강사입니다.<br />
                비전공자도 어려움 없이 생성성 AI를 이해하고 실생활이나 업무 현장에서 실전적인 AI 혜택을 즉시 활용할 수 있도록 맞춤형 실습 교육을 전문으로 전달합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 hover:cursor-default">
              
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-center md:text-left">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">전문 분야</h4>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">생성형 AI 활용 교육</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-center md:text-left">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">대표 경력</h4>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-350">공공기관 및 대학 대상 AI 교육 진행</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-center md:text-left">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">강의 주제</h4>
                <p className="text-sm font-semibold text-slate-755 dark:text-slate-350">ChatGPT, AI 활용법</p>
              </div>

            </div>
          </section>

          {/* Neutral Methodology Modality Section */}
          <section id="modality" className="text-center bg-white dark:bg-[#111827] rounded-3xl p-8 sm:p-12 border border-slate-150 dark:border-slate-850/80 transition-colors">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">CORE VAL</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">교육방식</h3>
            <div className="w-10 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-4 rounded-full mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs mx-auto">1</div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">교육 방식 협의 가능</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  목적 및 일정을 충분히 수렴하여 적합한 교육 형태로 맞춤 합의합니다.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs mx-auto">2</div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">대상과 목적에 맞춘 교육 구성</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  대학, 공공조직, 기업 수강자 그룹별 맞춤 난이도를 설계해 제안합니다.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs mx-auto">3</div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">실무 활용 중심 교육 방향</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  실습 도중 언제든 현직에 곧바로 꺼내 쓸 수 있도록 실무 집중 위주 교육을 지향합니다.
                </p>
              </div>

            </div>
          </section>

        </main>

        {/* Bottom Feature Bar dynamically integrated matching Professional Polish layout */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-12">
          <div className="bg-white dark:bg-[#111827] border border-slate-150 dark:border-slate-850 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between transition-colors">
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
              {/* Feature 1 */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">교육 방식 협의 가능</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">상황에 최적화된 맞춤 구성</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">대상 맞춤 교육</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">비전공자도 쉬운 설명</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">실무 중심 커리큘럼</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">즉시 활용 가능한 AI 노하우</p>
                </div>
              </div>
            </div>

            <footer className="text-center md:text-right border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-4 md:pt-0 md:pl-8 flex-shrink-0 w-full md:w-auto">
              <p className="text-xs font-bold text-slate-800 dark:text-white">한희경강사</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">실전 AI 교육 전문가</p>
            </footer>

          </div>
        </div>

        {/* Outer bottom-most Footer Section */}
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center sm:text-left space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-extrabold text-white text-lg block">한희경강사</span>
                <span className="text-xs text-slate-500 block mt-1">비전공자도 이해하는 실전 AI 교육전문가</span>
              </div>
              <div className="flex gap-4 text-xs font-semibold">
                <a href="#home" className="hover:text-white">홈</a>
                <a href="#introduction" className="hover:text-white">강사소개</a>
                <a href="#modality" className="hover:text-white">교육방식</a>
                <a href="#curriculum" className="hover:text-white">교육내용</a>
                <a href="#contact" className="hover:text-white">교육문의</a>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p>&copy; {new Date().getFullYear()} 한희경강사. All Rights Reserved.</p>
              <div className="flex items-center gap-3">
                <a href={formLinks.educationApplication} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 text-[11px] font-bold">
                  공식 구글폼 신청서 연결 완료 &rarr;
                </a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

// Chevron helper icon since we didn't import ChevronRight specifically from Lucide
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
