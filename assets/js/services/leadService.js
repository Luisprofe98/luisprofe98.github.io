const leadKey = "clubox.leads";
export function saveLead(leadData) { const rawData = localStorage.getItem(leadKey); const leadList = rawData ? JSON.parse(rawData) : []; const savedLead = { ...leadData, leadId: crypto.randomUUID(), leadDate: new Date().toISOString() }; leadList.push(savedLead); localStorage.setItem(leadKey, JSON.stringify(leadList)); return savedLead; }
