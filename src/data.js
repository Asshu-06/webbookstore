// Mock data for demo

export const ACTIVITIES = [
  { id: '1', slug: 'annual-literacy-drive-2024', title: 'Annual Literacy Drive 2024', category: 'Education & Learning', categorySlug: 'education-learning', date: '2024-03-15', description: 'A month-long literacy drive across 12 villages in rural Maharashtra, reaching over 2,000 individuals through interactive workshops.', coverColor: '#1a3c5e' },
  { id: '2', slug: 'research-symposium-2024', title: 'Research Symposium on Indian Literature', category: 'Research & Innovation', categorySlug: 'research-innovation', date: '2024-05-20', description: 'A two-day national symposium with 85 scholars presenting papers on classical and contemporary Indian literature.', coverColor: '#2a5080' },
  { id: '3', slug: 'book-fair-2024', title: 'Regional Book Fair 2024', category: 'Books & Literature', categorySlug: 'books-literature', date: '2024-07-10', description: 'Regional book fair with 150+ authors, 40 publishers, and over 15,000 visitors over three days.', coverColor: '#c8963c' },
  { id: '4', slug: 'community-heritage-project', title: 'Community Heritage Documentation', category: 'Social & Community Outreach', categorySlug: 'social-community-outreach', date: '2024-08-05', description: 'Documenting oral histories, folk songs, and traditional art forms from 5 districts with 300+ hours archived.', coverColor: '#4a7c5c' },
  { id: '5', slug: 'editorial-skills-workshop', title: 'Professional Editorial Skills Workshop', category: 'Training & Professional Development', categorySlug: 'training-professional-development', date: '2024-09-12', description: 'Five-day intensive training for aspiring editors covering manuscript evaluation and digital publishing workflows.', coverColor: '#5a4080' },
  { id: '6', slug: 'school-reading-programme', title: 'School Reading Programme Initiative', category: 'Education & Learning', categorySlug: 'education-learning', date: '2024-10-01', description: 'Reading corners in 25 government schools with 10,000+ books donated and 60 teachers trained.', coverColor: '#1a5c6e' },
]

export const BOOKS = [
  { id: '1', slug: 'rivers-of-memory', title: 'Rivers of Memory', author: 'Dr. Priya Sharma', isbn: '978-93-5491-201-3', year: 2024, genre: 'Literary Fiction', description: 'A lyrical exploration of generational memory through three women across different eras of Indian history.', price: 495 },
  { id: '2', slug: 'the-quiet-scholars', title: 'The Quiet Scholars', author: 'Rajesh Nambiar', isbn: '978-93-5491-202-0', year: 2024, genre: 'Biography', description: 'Compelling biographies of ten unsung Indian scholars who transformed regional literature.', price: 550 },
  { id: '3', slug: 'monsoon-verses', title: 'Monsoon Verses', author: 'Ananya Krishnan', isbn: '978-93-5491-203-7', year: 2023, genre: 'Poetry', description: 'A collection of 78 poems celebrating rainfall, rivers, and the rhythms of agrarian life in southern India.', price: 350 },
  { id: '4', slug: 'education-reimagined', title: 'Education Reimagined', author: 'Prof. Suresh Iyer', isbn: '978-93-5491-204-4', year: 2023, genre: 'Non-Fiction', description: 'Analysis of alternative education models drawing from traditional gurukul systems and modern pedagogy.', price: 620 },
  { id: '5', slug: 'salt-and-silk', title: 'Salt and Silk', author: 'Meera Pillai', isbn: '978-93-5491-205-1', year: 2024, genre: 'Historical Fiction', description: 'A merchant family across three centuries of commerce along the ancient spice trade routes.', price: 580 },
  { id: '6', slug: 'folk-tales-deccan', title: 'Folk Tales of the Deccan', author: 'Dr. Kavita Rao', isbn: '978-93-5491-206-8', year: 2023, genre: 'Folklore', description: '45 folk tales from the Deccan plateau with original illustrations and cultural annotations.', price: 445 },
]

export const EVENTS = [
  { id: '1', title: 'Annual Foundation Day Celebration', date: '2024-11-15', type: 'event', description: 'The 12th Annual Foundation Day with award ceremonies, cultural programmes, and launch of three new publications.' },
  { id: '2', title: 'International Symposium on Regional Literature', date: '2024-12-08', type: 'event', description: 'Two-day international symposium with speakers from 8 countries on preservation of regional literary traditions.' },
  { id: '3', title: 'Author Meetup: Writing About Tradition', date: '2024-10-22', type: 'news', description: 'Monthly meetup with three acclaimed authors discussing the craft of writing about cultural traditions.' },
  { id: '4', title: 'Call for Manuscripts 2025', date: '2024-11-01', type: 'news', description: 'Annual call for manuscripts for the 2025 publication cycle. Submissions open in all Indian languages.' },
]

export const GALLERY_ITEMS = [
  { id: '1', type: 'Photo', title: 'Annual Literacy Drive — Village Workshop', year: 2024, category: 'Events', color: '#1a3c5e' },
  { id: '2', type: 'Photo', title: 'Book Fair 2024 — Opening Ceremony', year: 2024, category: 'Book Launches', color: '#c8963c' },
  { id: '3', type: 'Photo', title: 'Research Symposium — Panel Discussion', year: 2024, category: 'Events', color: '#2a5080' },
  { id: '4', type: 'Photo', title: 'Heritage Documentation — Field Recording', year: 2024, category: 'Events', color: '#4a7c5c' },
  { id: '5', type: 'Photo', title: 'Editorial Workshop — Participants', year: 2023, category: 'Events', color: '#5a4080' },
  { id: '6', type: 'Photo', title: 'Foundation Day — Award Ceremony', year: 2023, category: 'Events', color: '#1a5c6e' },
  { id: '7', type: 'Photo', title: 'Rivers of Memory — Book Launch', year: 2024, category: 'Book Launches', color: '#7c3040' },
  { id: '8', type: 'Photo', title: 'Monsoon Verses — Poetry Reading', year: 2023, category: 'Book Launches', color: '#3c6040' },
  { id: '9', type: 'Photo', title: 'National Newspaper Coverage', year: 2024, category: 'Media Coverage', color: '#4c4c4c' },
]

export const MEMBERSHIP_CATEGORIES = [
  { id: '1', name: 'Life Member', fee: 5000, duration: 'Lifetime', benefits: ['All Foundation events', 'Annual publication gift', 'Voting rights', 'Research library access', 'Monthly newsletter'], eligibility: 'Open to all individuals committed to education and literature' },
  { id: '2', name: 'Annual Member', fee: 1000, duration: '1 Year', benefits: ['Foundation events access', 'Digital newsletter', 'Publication discounts'], eligibility: 'Open to all individuals' },
  { id: '3', name: 'Institutional Member', fee: 10000, duration: 'Annual (Institution)', benefits: ['Institutional listing on website', 'Bulk event access', 'Research collaboration', 'Priority submissions'], eligibility: 'Educational institutions, libraries, and cultural organisations' },
  { id: '4', name: 'Student Member', fee: 250, duration: '1 Year', benefits: ['Events at student rates', 'Mentorship access', 'Internship priority'], eligibility: 'Currently enrolled students' },
]

export const INTERNSHIP_AREAS = [
  { id: '1', area: 'Education & Research', duration: '2-3 Months', description: 'Support educational programmes and assist with research documentation.', stipend: '3,000/month' },
  { id: '2', area: 'Publishing & Editorial', duration: '3 Months', description: 'Hands-on experience in manuscript review, editorial processes, and publishing workflows.', stipend: '3,500/month' },
  { id: '3', area: 'Content Development', duration: '2 Months', description: 'Create content for the Foundation website, newsletters, and promotional materials.', stipend: '2,500/month' },
  { id: '4', area: 'Digital Media', duration: '2-3 Months', description: 'Photography, videography, and digital content creation for events and publications.', stipend: '3,000/month' },
  { id: '5', area: 'Event Management', duration: '1-2 Months', description: 'Planning and executing Foundation events, book fairs, and cultural programmes.', stipend: '2,000/month' },
  { id: '6', area: 'Community Outreach', duration: '2-3 Months', description: 'Field work in community literacy programmes and data collection.', stipend: '2,500/month' },
]

export const COMPLIANCE_DOCS = [
  { id: '1', title: 'Certificate of Registration', type: 'Registration', year: 2012, size: '1.2 MB' },
  { id: '2', title: '80G Tax Exemption Certificate', type: 'Registration', year: 2013, size: '0.8 MB' },
  { id: '3', title: '12A Registration Certificate', type: 'Registration', year: 2013, size: '0.9 MB' },
  { id: '4', title: 'Annual Report 2023-24', type: 'Annual Report', year: 2024, size: '4.5 MB' },
  { id: '5', title: 'Annual Report 2022-23', type: 'Annual Report', year: 2023, size: '4.1 MB' },
  { id: '6', title: 'Annual Report 2021-22', type: 'Annual Report', year: 2022, size: '3.8 MB' },
  { id: '7', title: 'Audited Financial Statement 2023-24', type: 'Financial Statement', year: 2024, size: '2.1 MB' },
  { id: '8', title: 'Audited Financial Statement 2022-23', type: 'Financial Statement', year: 2023, size: '1.9 MB' },
  { id: '9', title: 'Privacy Policy', type: 'Policy', year: 2024, size: '0.4 MB' },
  { id: '10', title: 'Publication Policy', type: 'Policy', year: 2024, size: '0.6 MB' },
]

export const FAQS = [
  { q: 'How long does the publication process take?', a: 'Typically 4-8 months from manuscript submission to publication, including editorial review, design, and printing.' },
  { q: 'Do you publish in regional Indian languages?', a: 'Yes. We actively encourage manuscripts in Hindi, Marathi, Kannada, Tamil, Telugu, Bengali, and other Indian languages.' },
  { q: 'What genres do you publish?', a: 'Literary fiction, non-fiction, poetry, biography, folklore, academic works, and books on cultural heritage.' },
  { q: 'Is there a submission fee?', a: 'No. We do not charge any submission fees. All manuscript reviews are conducted free of charge.' },
  { q: 'How are royalties structured?', a: 'Authors receive 10-15% royalties on net sales. Details are specified in the individual publication agreement.' },
  { q: 'Can I submit a previously published work?', a: 'No. We only accept original, unpublished manuscripts not currently under consideration elsewhere.' },
]