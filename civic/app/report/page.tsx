"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  FaUpload,
  FaTrash,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaRobot,
  FaUserSecret,
  FaFlag,
  FaPhone,
} from "react-icons/fa";

interface Report {
  id: string;
  timestamp: number;
  description: string;
  additionalInfo?: string;
  comments?: string;
  location: { pincode?: string; lat?: number; lng?: number };
  department: string;
  mediaFiles: File[];
  mediaURLs: string[];
  userName?: string;
  anonymous?: boolean;
  priority: "Low" | "Medium" | "High";
  authority?: Authority;
}

interface Authority {
  name: string;
  helpline: string;
}

const DEPARTMENT_KEYWORDS: Record<string, string> = {
  streetlight: "Public Works",
  garbage: "Sanitation",
  water: "Water Department",
  noise: "Law Enforcement",
  road: "Transportation",
  traffic: "Transportation",
  pollution: "Environment",
};

const AUTHORITY_DATA: Record<string, { name: string; helpline: string }> = {
   // existing entries
  "110003": { name: "Delhi Karol Bagh Office", helpline: "1800 266 6868" },
  "110004": { name: "Delhi Patel Nagar Office", helpline: "1800 266 6868" },
  "110005": { name: "Delhi Mayur Vihar Office", helpline: "1800 266 6868" },
  "110006": { name: "Delhi Lodhi Road Office", helpline: "1800 266 6868" },
  "400003": { name: "Mumbai Mazgaon Office", helpline: "1800 266 6868" },
  "400004": { name: "Mumbai Churchgate Office", helpline: "1800 266 6868" },
  "400005": { name: "Mumbai Dadar Office", helpline: "1800 266 6868" },
  "700002": { name: "Kolkata Park Street Office", helpline: "1800 266 6868" },
  "700003": { name: "Kolkata Howrah Office", helpline: "1800 266 6868" },
  "700004": { name: "Kolkata Esplanade Office", helpline: "1800 266 6868" },
  "600003": { name: "Chennai Egmore Office", helpline: "1800 266 6868" },
  "600004": { name: "Chennai Royapettah Office", helpline: "1800 266 6868" },
  "560003": { name: "Bengaluru Jayanagar Office", helpline: "1800 266 6868" },
  "560004": { name: "Bengaluru Whitefield Office", helpline: "1800 266 6868" },
  "500003": { name: "Hyderabad Himayatnagar Office", helpline: "1800 266 6868" },
  "500004": { name: "Hyderabad Secunderabad Office", helpline: "1800 266 6868" },
  "380003": { name: "Ahmedabad Maninagar Office", helpline: "1800 266 6868" },
  "380004": { name: "Ahmedabad Ghatlodia Office", helpline: "1800 266 6868" },
  "411003": { name: "Pune Kothrud Office", helpline: "1800 266 6868" },
  "411004": { name: "Pune Hadapsar Office", helpline: "1800 266 6868" },
  "395003": { name: "Surat Piplod Office", helpline: "1800 266 6868" },
  "395004": { name: "Surat Varachha Office", helpline: "1800 266 6868" },
  "302003": { name: "Jaipur Malviya Nagar Office", helpline: "1800 266 6868" },
  "302004": { name: "Jaipur Civil Lines Office", helpline: "1800 266 6868" },
  "226004": { name: "Lucknow Hazratganj Office", helpline: "1800 266 6868" },
  "226005": { name: "Lucknow Gomti Nagar East Office", helpline: "1800 266 6868" },
  "282002": { name: "Agra Fatehabad Office", helpline: "1800 266 6868" },
  "282003": { name: "Agra Sanjay Place Office", helpline: "1800 266 6868" },
  "390002": { name: "Vadodara Alkapuri Office", helpline: "1800 266 6868" },
  "570002": { name: "Mysore V V Mohalla Office", helpline: "1800 266 6868" },
  "530002": { name: "Visakhapatnam Dwaraka Nagar Office", helpline: "1800 266 6868" },
  "342002": { name: "Jodhpur Sardarpura Office", helpline: "1800 266 6868" },
  "431002": { name: "Aurangabad CIDCO Office", helpline: "1800 266 6868" },
  "250002": { name: "Meerut Shastri Nagar Office", helpline: "1800 266 6868" },
  "751002": { name: "Bhubaneswar Sahid Nagar Office", helpline: "1800 266 6868" },
  "482002": { name: "Jabalpur Madan Mahal Office", helpline: "1800 266 6868" },
  "248002": { name: "Dehradun Rajpur Road Office", helpline: "1800 266 6868" },
  "826002": { name: "Dhanbad Bank More Office", helpline: "1800 266 6868" },
  "769002": { name: "Rourkela Industrial Area Office", helpline: "1800 266 6868" },
  "180002": { name: "Jammu Gandhi Nagar Office", helpline: "1800 266 6868" },
  "313002": { name: "Udaipur Hiran Magri Office", helpline: "1800 266 6868" },
  "670002": { name: "Kannur Fort Road Office", helpline: "1800 266 6868" },
  "474002": { name: "Gwalior City Centre Office", helpline: "1800 266 6868" },
  "695002": { name: "Thiruvananthapuram Pattom Office", helpline: "1800 266 6868" },
  "560005": { name: "Bengaluru Indiranagar Office", helpline: "1800 266 6868" },
  "500005": { name: "Hyderabad Banjara Hills Office", helpline: "1800 266 6868" },
  "143002": { name: "Amritsar Hall Bazaar Office", helpline: "1800 266 6868" },
  "143003": { name: "Amritsar Katra Ahluwalia Office", helpline: "1800 266 6868" },
  "110007": { name: "Delhi Rohini Office", helpline: "1800 266 6868" },
  "110008": { name: "Delhi Dwarka Office", helpline: "1800 266 6868" },
  "400006": { name: "Mumbai Andheri Office", helpline: "1800 266 6868" },
  "400007": { name: "Mumbai Bandra Office", helpline: "1800 266 6868" },
  "700005": { name: "Kolkata Salt Lake Office", helpline: "1800 266 6868" },
  "700006": { name: "Kolkata Tollygunge Office", helpline: "1800 266 6868" },
  "600005": { name: "Chennai Velachery Office", helpline: "1800 266 6868" },
  "560006": { name: "Bengaluru Whitefield East Office", helpline: "1800 266 6868" },
  "500006": { name: "Hyderabad Kukatpally Office", helpline: "1800 266 6868" },
  "380005": { name: "Ahmedabad Vastrapur Office", helpline: "1800 266 6868" },
  "411005": { name: "Pune Shivajinagar East Office", helpline: "1800 266 6868" },
  "395005": { name: "Surat Udhna Office", helpline: "1800 266 6868" },
  "302005": { name: "Jaipur Sodala Office", helpline: "1800 266 6868" },
  "226006": { name: "Lucknow Aminabad Office", helpline: "1800 266 6868" },
  "282004": { name: "Agra Sikandra Office", helpline: "1800 266 6868" },
  "390003": { name: "Vadodara Manjalpur Office", helpline: "1800 266 6868" },
  "570003": { name: "Mysore Chamrajpet Office", helpline: "1800 266 6868" },
  "530003": { name: "Visakhapatnam MVP Colony Office", helpline: "1800 266 6868" },
  "342003": { name: "Jodhpur Sardarpura West Office", helpline: "1800 266 6868" },
  "431003": { name: "Aurangabad Shahganj Office", helpline: "1800 266 6868" },
  "250003": { name: "Meerut Garh Road Office", helpline: "1800 266 6868" },
  "751003": { name: "Bhubaneswar Khandagiri Office", helpline: "1800 266 6868" },
  "482003": { name: "Jabalpur Tilak Nagar Office", helpline: "1800 266 6868" },
  "248003": { name: "Dehradun Rajpur Office", helpline: "1800 266 6868" },
  "826003": { name: "Dhanbad Kalimati Office", helpline: "1800 266 6868" },
  "769003": { name: "Rourkela Chhend Office", helpline: "1800 266 6868" },
  "180003": { name: "Jammu Janipur Office", helpline: "1800 266 6868" },
  "313003": { name: "Udaipur Madar Office", helpline: "1800 266 6868" },
  "670003": { name: "Kannur Thavakkara Office", helpline: "1800 266 6868" },
  "474003": { name: "Gwalior Lashkar Office", helpline: "1800 266 6868" },
  "695003": { name: "Thiruvananthapuram Vazhuthacaud Office", helpline: "1800 266 6868" },
  "600006": { name: "Chennai Anna Nagar Office", helpline: "1800 266 6868" },
  "400008": { name: "Mumbai Vile Parle Office", helpline: "1800 266 6868" },
  "110009": { name: "Delhi Janakpuri Office", helpline: "1800 266 6868" },
  "560007": { name: "Bengaluru Koramangala Office", helpline: "1800 266 6868" },
  "500007": { name: "Hyderabad Hitech City Office", helpline: "1800 266 6868" },
  "380006": { name: "Ahmedabad Satellite Office", helpline: "1800 266 6868" },
  "411006": { name: "Pune Baner Office", helpline: "1800 266 6868" },
  "395006": { name: "Surat City Light Office", helpline: "1800 266 6868" },
  "302006": { name: "Jaipur Vaishali Nagar Office", helpline: "1800 266 6868" },
  "226007": { name: "Lucknow Gomti Nagar West Office", helpline: "1800 266 6868" },
  "282005": { name: "Agra Raja Ki Mandi Office", helpline: "1800 266 6868" },
  "390004": { name: "Vadodara Fatehgunj Office", helpline: "1800 266 6868" },
  "570004": { name: "Mysore Yadavagiri Office", helpline: "1800 266 6868" },
  "530004": { name: "Visakhapatnam Seethammapeta Office", helpline: "1800 266 6868" },
  "342004": { name: "Jodhpur Sojati Gate Office", helpline: "1800 266 6868" },
  "431004": { name: "Aurangabad Jalna Road Office", helpline: "1800 266 6868" },
  "250004": { name: "Meerut Civil Lines Office", helpline: "1800 266 6868" },
  "751004": { name: "Bhubaneswar Master Canteen Office", helpline: "1800 266 6868" },
  "482004": { name: "Jabalpur Cantonment Office", helpline: "1800 266 6868" },
  "248004": { name: "Dehradun Clock Tower Office", helpline: "1800 266 6868" },
  "826004": { name: "Dhanbad Jharia Office", helpline: "1800 266 6868" },
  "769004": { name: "Rourkela Panposh Office", helpline: "1800 266 6868" },
  "180004": { name: "Jammu Gandhi Nagar East Office", helpline: "1800 266 6868" },
  "313004": { name: "Udaipur Bhupalpura Office", helpline: "1800 266 6868" },
  "670004": { name: "Kannur Talap Office", helpline: "1800 266 6868" },
  "474004": { name: "Gwalior Morar Office", helpline: "1800 266 6868" },
  "695004": { name: "Thiruvananthapuram Kowdiar Office", helpline: "1800 266 6868" },
  "700123": { name: "Barasat Office", helpline: "1800 266 6868" },
  "700124": { name: "Dum Dum Office", helpline: "1800 266 6868" },
  "700125": { name: "New Town Office", helpline: "1800 266 6868" },
  "700126": { name: "Garia Office", helpline: "1800 266 6868" },
  "700127": { name: "Behala Office", helpline: "1800 266 6868" },
  "700128": { name: "Baranagar Office", helpline: "1800 266 6868" },
  "700129": { name: "Kolkata Airport Area Office", helpline: "1800 266 6868" },
  "700130": { name: "Kolkata Beliaghata Office", helpline: "1800 266 6868" },
  "700131": { name: "Kolkata Ultadanga Office", helpline: "1800 266 6868" },
  "700132": { name: "Kolkata Tangra Office", helpline: "1800 266 6868" },
  "700133": { name: "Kolkata Jadavpur Office", helpline: "1800 266 6868" },
  "700134": { name: "Kolkata Ballygunge Office", helpline: "1800 266 6868" },
  "700135": { name: "Kolkata Park Circus Office", helpline: "1800 266 6868" },
  "700136": { name: "Kolkata Shyambazar Office", helpline: "1800 266 6868" },
  "700137": { name: "Kolkata Kalighat Office", helpline: "1800 266 6868" },
  "700138": { name: "Kolkata Chetla Office", helpline: "1800 266 6868" },
  "700139": { name: "Kolkata Hastings Office", helpline: "1800 266 6868" },
  "700140": { name: "Kolkata Metiabruz Office", helpline: "1800 266 6868" },
  "700141": { name: "Kolkata Kidderpore Office", helpline: "1800 266 6868" },
  "700142": { name: "Kolkata Alipore Office", helpline: "1800 266 6868" },
  "700143": { name: "Kolkata Hastings Office", helpline: "1800 266 6868" },
  "700144": { name: "Kolkata Kidderpore Office", helpline: "1800 266 6868" },
  "700145": { name: "Kolkata Alipore Office", helpline: "1800 266 6868" },
  "700146": { name: "Kolkata Watgunge Office", helpline: "1800 266 6868" },
  "700147": { name: "Kolkata Ekbalpore Office", helpline: "1800 266 6868" },
  "700148": { name: "Kolkata Kidderpore Office", helpline: "1800 266 6868" },
  "700149": { name: "Kolkata Alipore Office", helpline: "1800 266 6868" },
  "712302": { name: "Dhaniakhali Office", helpline: "1800 266 6868" },
  "713101": { name: "Arambagh Office", helpline: "1800 266 6868" },
  "713102": { name: "Tarakeswar Office", helpline: "1800 266 6868" },
  "713103": { name: "Chandannagar Office", helpline: "1800 266 6868" },
  "713104": { name: "Serampore Office", helpline: "1800 266 6868" },
  "713301": { name: "Jangipara Office", helpline: "1800 266 6868" },
  "713302": { name: "Uttarpara Office", helpline: "1800 266 6868" },
  "713303": { name: "Champdani Office", helpline: "1800 266 6868" },
  "713304": { name: "Bhadreswar Office", helpline: "1800 266 6868" },
  "713305": { name: "Mogra Office", helpline: "1800 266 6868" },     
};


const STEPS = [
  { id: 1, title: "Upload Evidence" },
  { id: 2, title: "Describe Issue" },
  { id: 3, title: "Choose Location" },
  { id: 4, title: "Select Authority" },
  { id: 5, title: "Set Preferences" },
  { id: 6, title: "Attach Additional Info" },
  { id: 7, title: "Add Comments" },
  { id: 8, title: "Review Report" },
  { id: 9, title: "Completed" },
];

export default function ReportPage() {
  // Dynamic user login
  const [loggedInUserName, setLoggedInUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUserName") || "John Doe";
    setLoggedInUserName(storedUser);
  }, []);

  const [step, setStep] = useState(1);

  // File handling
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaURLs, setMediaURLs] = useState<string[]>([]);
  const [isLoadingDesc, setIsLoadingDesc] = useState(false);

  // Report fields
  const [description, setDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [comments, setComments] = useState("");
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState<{ lat?: number; lng?: number } | null>(
    null
  );
  const [department, setDepartment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [selectedAuthority, setSelectedAuthority] = useState<Authority | null>(null);

  // Reports history
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("civicReports");
    if (stored) setReports(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("civicReports", JSON.stringify(reports));
  }, [reports]);

  // Mock AI extraction for description
  async function mockExtractDescription(files: File[]): Promise<string> {
    setIsLoadingDesc(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const names = files.map((f) => f.name.toLowerCase()).join(" ");
        let desc =
          "AI detected a possible civic issue. Please verify and edit below.";
        if (names.includes("streetlight"))
          desc = "AI suggests: Broken streetlight causing dark and unsafe street.";
        else if (names.includes("garbage"))
          desc = "AI suggests: Garbage dumped on roadside, attracting pests.";
        else if (names.includes("water"))
          desc = "AI suggests: Water leakage forming puddle, possible hazard.";
        setIsLoadingDesc(false);
        resolve(desc);
      }, 1500);
    });
  }

  // File drop handler
  const onDrop = async (acceptedFiles: File[]) => {
    mediaURLs.forEach((url) => URL.revokeObjectURL(url));
    const newFiles = [...mediaFiles, ...acceptedFiles];
    const newURLs = newFiles.map((file) => URL.createObjectURL(file));
    setMediaFiles(newFiles);
    setMediaURLs(newURLs);
    const extracted = await mockExtractDescription(newFiles);
    setDescription(extracted);
    setDepartmentFromDescription(extracted);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
  });

  function removeFile(index: number) {
    const toRemove = mediaURLs[index];
    URL.revokeObjectURL(toRemove);
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
    setMediaURLs(mediaURLs.filter((_, i) => i !== index));
  }

  function handleDescriptionChange(text: string) {
    setDescription(text);
    setDepartmentFromDescription(text);
  }

  function setDepartmentFromDescription(desc: string) {
    const lower = desc.toLowerCase();
    for (const key in DEPARTMENT_KEYWORDS) {
      if (lower.includes(key)) {
        setDepartment(DEPARTMENT_KEYWORDS[key]);
        return;
      }
    }
    setDepartment("General Administration");
  }

  // Geolocation
  function handleUseLocation() {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        alert("Location detected! Please select nearby authority in next step.");
      },
      () => alert("Could not detect location")
    );
  }

  // Validate steps before next
  function isStepValid(stepNum: number) {
    switch (stepNum) {
      case 1:
        return mediaFiles.length > 0;
      case 2:
        return description.trim().length > 0;
      case 3:
        return !!pincode.trim() || !!location;
      case 4:
        return !!selectedAuthority;
      default:
        return true;
    }
  }

  function goToStep(nextStep: number) {
    if (isStepValid(step)) setStep(nextStep);
  }

  // On submit, push report to history and show completed
  function handleSubmit() {
    if (!isStepValid(1)) return alert("Please upload at least one media file.");
    if (!isStepValid(2)) return alert("Please provide a description.");
    if (!isStepValid(3)) return alert("Please provide location info.");
    if (!isStepValid(4)) return alert("Please select an authority.");

    const newReport: Report = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      description,
      additionalInfo,
      comments,
      location: { pincode: pincode.trim(), lat: location?.lat, lng: location?.lng },
      department,
      mediaFiles,
      mediaURLs,
      userName: anonymous ? undefined : loggedInUserName,
      anonymous,
      priority,
      authority: selectedAuthority || undefined,
    };
    setReports([newReport, ...reports]);
    setStep(9); // Completed
  }

  // Reset full form
  function resetForm() {
    mediaURLs.forEach((url) => URL.revokeObjectURL(url));
    setStep(1);
    setMediaFiles([]);
    setMediaURLs([]);
    setDescription("");
    setAdditionalInfo("");
    setComments("");
    setPincode("");
    setLocation(null);
    setDepartment("");
    setAnonymous(false);
    setPriority("Medium");
    setSelectedAuthority(null);
  }

  // Suggest authorities based on pincode if available
  const suggestedAuthorities = pincode.trim()
    ? AUTHORITY_DATA[pincode.trim()]
      ? [AUTHORITY_DATA[pincode.trim()]]
      : []
    : [];

  return (
    <section className="container max-w-6xl mx-auto min-h-screen p-4 md:p-8 flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-lg">
      {/* Navigation */}
      <nav className="flex md:flex-col md:min-w-[220px] gap-3 md:gap-6 overflow-x-auto">
        {STEPS.map(({ id, title }) => {
          const isCurrent = id === step;
          const isCompleted = id < step;
          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={id}
              className={`flex items-center gap-2 cursor-pointer transition select-none ${
                isCurrent ? "text-green-700 font-semibold" : "text-gray-400"
              }`}
              onClick={() => goToStep(id)}
              aria-current={isCurrent ? "step" : undefined}
              aria-disabled={id > step}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                  isCompleted
                    ? "border-green-600 bg-green-600 text-white"
                    : isCurrent
                    ? "border-green-600 text-green-600"
                    : "border-gray-300 text-gray-400"
                }`}
                aria-label={`Step ${id}: ${title}`}
              >
                {isCompleted ? <FaCheckCircle /> : id}
              </div>
              <span className="hidden md:block">{title}</span>
            </motion.div>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-6 min-h-[600px]">
        <AnimatePresence mode="wait" initial={false}>
          {/* Step 1: Upload */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-5"
            >
              <h2 className="text-2xl font-semibold text-black">Upload Photos / Videos</h2>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition ${
                  isDragActive ? "border-green-600 bg-green-50" : "border-gray-300"
                }`}
                role="button"
                tabIndex={0}
                aria-label="File upload area"
              >
                <input {...getInputProps()} />
                <FaUpload className="text-4xl text-green-600 mb-3" aria-hidden="true" />
                {isDragActive ? (
                  <p className="text-black font-medium">Drop your files here...</p>
                ) : (
                  <p className="text-gray-600 text-center max-w-xs">
                    Drag & drop files here, or click to browse your device.
                  </p>
                )}
              </div>

              {mediaURLs.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mediaURLs.map((url, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="relative group rounded-lg overflow-hidden shadow-md border"
                    >
                      {mediaFiles[i]?.type.startsWith("image") ? (
                        <img
                          src={url}
                          className="w-full h-28 object-cover"
                          alt={`Upload preview ${i + 1}`}
                          loading="lazy"
                        />
                      ) : (
                        <video
                          src={url}
                          className="w-full h-28"
                          controls
                          preload="metadata"
                          aria-label={`Uploaded video ${i + 1}`}
                        />
                      )}
                      <button
                        onClick={() => removeFile(i)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        aria-label={`Remove file ${i + 1}`}
                      >
                        <FaTrash />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              <button
                disabled={!isStepValid(1) || isLoadingDesc}
                onClick={() => goToStep(2)}
                className={`mt-auto rounded-lg py-3 text-white shadow ${
                  !isStepValid(1) || isLoadingDesc
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                aria-disabled={!isStepValid(1) || isLoadingDesc}
              >
                {isLoadingDesc ? "Analyzing with AI..." : "Next"}
              </button>
            </motion.div>
          )}

          {/* Step 2: Description */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-2xl font-semibold text-black flex items-center gap-2">
                <FaRobot className="text-green-600" aria-hidden="true" /> AI-Assisted Description
              </h2>
              <textarea
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="w-full h-32 border border-gray-300 rounded-lg p-3 text-black resize-none"
                placeholder="Describe the issue here..."
                aria-label="Issue description"
              />
              <div
                className="p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700"
                aria-live="polite"
              >
                Suggested Department: <strong>{department}</strong>
              </div>
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                  aria-label="Back to upload step"
                >
                  <FaArrowLeft /> Back
                </button>
                <button
                  disabled={!isStepValid(2)}
                  onClick={() => goToStep(3)}
                  className={`rounded-lg py-3 px-6 text-white shadow ${
                    !isStepValid(2)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  aria-disabled={!isStepValid(2)}
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Choose Location */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-5"
            >
              <h2 className="text-2xl font-semibold text-black">Choose Location</h2>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-black"
                placeholder="Enter area pincode"
                aria-label="Area pincode"
                inputMode="numeric"
              />
              <button
                onClick={handleUseLocation}
                className="flex items-center gap-2 text-green-700 font-medium mb-1 md:mb-3"
                aria-label="Use current location"
              >
                <FaMapMarkerAlt aria-hidden="true" /> Use Current Location
              </button>
              {location && (
                <p className="text-sm text-gray-500" aria-live="polite">
                  Detected: {location.lat?.toFixed(3)}, {location.lng?.toFixed(3)}
                </p>
              )}
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                  aria-label="Back to description step"
                >
                  <FaArrowLeft /> Back
                </button>
                <button
                  disabled={!isStepValid(3)}
                  onClick={() => goToStep(4)}
                  className={`rounded-lg py-3 px-6 text-white shadow ${
                    !isStepValid(3)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  aria-disabled={!isStepValid(3)}
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Select Authority */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-2xl font-semibold text-black">
                Nearby Authority Suggestion
              </h2>
              {suggestedAuthorities.length > 0 ? (
                <>
                  {suggestedAuthorities.map((auth) => (
                    <motion.div
                      key={auth.name}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedAuthority(auth)}
                      className={`border p-4 rounded-lg cursor-pointer transition select-none ${
                        selectedAuthority?.name === auth.name
                          ? "bg-green-100 border-green-600"
                          : "bg-white border-gray-300"
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e: { key: string; }) => {
                        if (e.key === "Enter" || e.key === " ") setSelectedAuthority(auth);
                      }}
                      aria-pressed={selectedAuthority?.name === auth.name}
                      aria-label={`${auth.name} helpline ${auth.helpline}, select if this is the correct authority`}
                    >
                      <p className="font-medium">{auth.name}</p>
                      <p className="flex items-center gap-2 text-gray-600">
                        <FaPhone aria-hidden="true" /> {auth.helpline}
                      </p>
                    </motion.div>
                  ))}
                </>
              ) : (
                <p className="text-gray-500">
                  No authority found for this pincode. Please verify manually.
                </p>
              )}
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                  aria-label="Back to location step"
                >
                  <FaArrowLeft /> Back
                </button>
                <button
                  disabled={!isStepValid(4)}
                  onClick={() => goToStep(5)}
                  className={`rounded-lg py-3 px-6 text-white shadow ${
                    !isStepValid(4)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  aria-disabled={!isStepValid(4)}
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Preferences */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-2xl font-semibold text-black">Set Preferences</h2>
              <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition select-none ${
                anonymous ? "bg-gray-100 border-gray-400" : "bg-green-50 border-green-300"
              }`}>
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="hidden"
                  aria-label="Report anonymously"
                />
                <FaUserSecret
                  className={`text-2xl ${
                    anonymous ? "text-gray-600" : "text-green-600"
                  }`}
                  aria-hidden="true"
                />
                <span className="text-black">
                  {anonymous ? "You are reporting anonymously" : "Report with your identity"}
                </span>
              </label>
              <div className="flex flex-col gap-3">
                <p className="text-black font-medium select-none">Priority Level:</p>
                <div className="grid grid-cols-3 gap-3">
                  {(["Low", "Medium", "High"] as const).map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPriority(level)}
                      className={`flex items-center justify-center gap-2 py-3 rounded-lg shadow border transition select-none ${
                        priority === level
                          ? "bg-green-600 text-white border-green-700"
                          : "bg-gray-50 text-gray-600 border-gray-300"
                      }`}
                      aria-pressed={priority === level}
                      aria-label={`Set priority ${level}`}
                    >
                      <FaFlag aria-hidden="true" />
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => setStep(4)}
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                  aria-label="Back to authority selection"
                >
                  <FaArrowLeft /> Back
                </button>
                <button
                  onClick={() => goToStep(6)}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 6: Additional Info */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-2xl font-semibold text-black">Attach Additional Info (Optional)</h2>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full h-24 border border-gray-300 rounded-lg p-3 resize-none text-black"
                placeholder="Add any additional information here..."
                aria-label="Additional information"
              />
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => setStep(5)}
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                  aria-label="Back to preferences"
                >
                  <FaArrowLeft /> Back
                </button>
                <button
                  onClick={() => goToStep(7)}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 7: Comments */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-2xl font-semibold text-black">Add Comments (Optional)</h2>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full h-24 border border-gray-300 rounded-lg p-3 resize-none text-black"
                placeholder="Add comments here..."
                aria-label="Comments"
              />
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => setStep(6)}
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                  aria-label="Back to additional info"
                >
                  <FaArrowLeft /> Back
                </button>
                <button
                  onClick={() => goToStep(8)}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 8: Review */}
          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-2xl font-semibold text-black">Review Report</h2>
              <ul className="text-black text-sm space-y-3">
                <li><strong>Description:</strong> {description}</li>
                {additionalInfo && <li><strong>Additional Info:</strong> {additionalInfo}</li>}
                {comments && <li><strong>Comments:</strong> {comments}</li>}
                <li>
                  <strong>Department:</strong> {department}
                </li>
                <li>
                  <strong>Location:</strong> {pincode || "N/A"}{" "}
                  {location && `(${location.lat?.toFixed(4)}, ${location.lng?.toFixed(4)})`}
                </li>
                <li>
                  <strong>Authority:</strong> {selectedAuthority?.name}{" "}
                  {selectedAuthority && (
                    <a href={`tel:${selectedAuthority.helpline}`} className="ml-2 text-green-600 underline" aria-label={`Call helpline ${selectedAuthority.helpline}`}>
                      <FaPhone className="inline" /> {selectedAuthority.helpline}
                    </a>
                  )}
                </li>
                <li><strong>Priority:</strong> {priority}</li>
                <li><strong>User:</strong> {anonymous ? "Anonymous" : loggedInUserName}</li>
                <li><strong>Uploaded Files:</strong> {mediaFiles.length}</li>
              </ul>
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => setStep(7)}
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                  aria-label="Back to comments"
                >
                  <FaArrowLeft /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow"
                  aria-label="Submit report"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 9: Completed */}
          {step === 9 && (
            <motion.div
              key="step9"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6 items-center text-center"
              role="alert"
              aria-live="assertive"
            >
              <FaCheckCircle className="text-6xl text-green-600" aria-hidden="true" />
              <h2 className="text-3xl font-semibold text-black">
                Report Submitted Successfully!
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Thank you for helping improve your community. 💚 Your report has been sent
                to <strong>{department}</strong>.
              </p>
              <div className="flex gap-4 mt-4 flex-wrap justify-center">
                <button
                  onClick={resetForm}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow"
                  aria-label="Submit another report"
                >
                  Submit Another
                </button>
                <button
                  onClick={() => setStep(8)}
                  className="bg-gray-200 hover:bg-gray-300 text-black py-3 px-6 rounded-lg shadow"
                  aria-label="Review last report"
                >
                  Review Last Report
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </section>
  );
}
