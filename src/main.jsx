import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Activity,AlertTriangle,GitPullRequest,ShieldCheck,Bot,Terminal,Play,CheckCircle2,Clock3,ChevronRight,Send,Search,Settings,Code2} from 'lucide-react';
import './style.css';

const incidents=[
 {id:'#INC-1042',title:'ReferenceError: DATABASE_URL is not defined',service:'api-production',time:'2 min ago',severity:'Critical',status:'Fix ready',file:'src/config/database.js'},
 {id:'#INC-1041',title:'TypeError: Cannot read properties of undefined',service:'checkout-service',time:'18 min ago',severity:'High',status:'PR opened',file:'src/controllers/order.js'},
 {id:'#INC-1039',title:'Build failed: module not found',service:'web-production',time:'1 hr ago',severity:'Medium',status:'Resolved',file:'src/components/Checkout.jsx'}
];

function App(){
 const [tab,setTab]=useState('Overview'); const [running,setRunning]=useState(false); const [fixed,setFixed]=useState(false);
 const runFix=()=>{setRunning(true);setFixed(false);setTimeout(()=>setFixed(true),2600);setTimeout(()=>setRunning(false),3600)};
 return <div className="app">
  <aside><div className="brand"><div className="logo"><Bot size={22}/></div><div><b>FIXFORGE</b><span>AI DevOps Agent</span></div></div>
   <nav>{['Overview','Incidents','AI Fix Agent','Pull Requests'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x==='Overview'?<Activity/>:x==='Incidents'?<AlertTriangle/>:x==='AI Fix Agent'?<Bot/>:<GitPullRequest/>}{x}</button>)}</nav>
   <div className="sidecard"><div className="online"><i/> Agent online</div><p>Watching <b>Dev</b> branch</p><small>Last sync 32 sec ago</small></div>
   <button className="settings"><Settings/> Settings</button>
  </aside>
  <main><header><div><div className="eyebrow">AUTONOMOUS SOFTWARE RECOVERY</div><h1>{tab}</h1><p>Detect. Diagnose. Fix. Review. Open the PR.</p></div><div className="header-actions"><div className="search"><Search size={17}/> Search</div><button className="primary" onClick={runFix}><Play size={16}/> {running?'Agent running…':'Run AI Fix'}</button></div></header>
   {tab==='Overview' && <>
   <section className="metrics"><Metric icon={<AlertTriangle/>} label="Open incidents" value="2" note="1 critical"/><Metric icon={<CheckCircle2/>} label="Fix success rate" value="94%" note="Last 30 days"/><Metric icon={<GitPullRequest/>} label="PRs created" value="38" note="12 this week"/><Metric icon={<Clock3/>} label="Avg. recovery" value="4m 18s" note="−31% vs last month"/></section>
   <div className="grid"><section className="panel wide"><div className="panelhead"><div><h2>Live Agent Activity</h2><p>Real-time autonomous recovery pipeline</p></div><span className="live"><i/> LIVE</span></div>
    <div className="timeline"><Step n="01" title="Error detected" text="Production deployment failed on api-production" done/><Step n="02" title="Root cause identified" text="Missing DATABASE_URL environment reference" done/><Step n="03" title="Code fix generated" text="src/config/database.js · 6 lines changed" done={fixed||!running}/><Step n="04" title="Self-review & tests" text={fixed?'18/18 tests passed · Security scan clean':'Waiting for agent…'} done={fixed}/><Step n="05" title="Pull Request" text={fixed?'PR #184 opened against Dev':'Awaiting validation'} done={fixed}/></div>
   </section>
   <section className="panel"><div className="panelhead"><div><h2>System Health</h2><p>Connected services</p></div></div><Health name="GitHub" value="Connected"/><Health name="Vercel" value="Healthy"/><Health name="AI Engine" value="Ready"/><Health name="Telegram" value="Connected"/></section></div>
   <section className="panel incidents"><div className="panelhead"><div><h2>Recent Incidents</h2><p>Errors detected across monitored deployments</p></div><button className="ghost" onClick={()=>setTab('Incidents')}>View all <ChevronRight size={16}/></button></div><table><thead><tr><th>Incident</th><th>Service</th><th>Severity</th><th>Status</th><th>Time</th></tr></thead><tbody>{incidents.map(i=><tr key={i.id}><td><b>{i.id}</b><div>{i.title}</div></td><td>{i.service}</td><td><span className={'pill '+i.severity.toLowerCase()}>{i.severity}</span></td><td><span className="status"><i/>{i.status}</span></td><td>{i.time}</td></tr>)}</tbody></table></section>
   </>}
   {tab==='Incidents' && <IncidentList runFix={runFix}/>} 
   {tab==='AI Fix Agent' && <AgentPanel running={running} fixed={fixed} runFix={runFix}/>} 
   {tab==='Pull Requests' && <PRPanel/>}
  </main>
 </div>
}
function Metric({icon,label,value,note}){return <div className="metric"><div className="metricicon">{icon}</div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>}
function Step({n,title,text,done}){return <div className="step"><div className={'stepnum '+(done?'done':'')}>{done?<CheckCircle2 size={18}/>:n}</div><div><b>{title}</b><p>{text}</p></div></div>}
function Health({name,value}){return <div className="health"><span>{name}</span><b><i/>{value}</b></div>}
function IncidentList({runFix}){return <section className="panel full"><div className="panelhead"><div><h2>Incident Queue</h2><p>AI triage and automated recovery status</p></div></div>{incidents.map(i=><div className="incidentcard" key={i.id}><div className="incidenticon"><AlertTriangle/></div><div className="incmain"><b>{i.title}</b><p>{i.id} · {i.service} · {i.file}</p></div><span className={'pill '+i.severity.toLowerCase()}>{i.severity}</span><span className="status"><i/>{i.status}</span><button className="smallbtn" onClick={runFix}>Fix <ChevronRight size={14}/></button></div>)}</section>}
function AgentPanel({running,fixed,runFix}){return <section className="agentgrid"><div className="panel codepanel"><div className="panelhead"><div><h2>AI Fix Agent</h2><p>Incident #INC-1042 · database configuration</p></div><span className="agentbadge"><Bot size={15}/> AUTONOMOUS</span></div><div className="terminal"><div className="termbar"><span/><span/><span/><b>agent-session.log</b></div><pre>{`$ fixforge diagnose --incident INC-1042\n\n[✓] Pulled Dev branch\n[✓] Parsed deployment logs\n[✓] Located failing module\n[✓] Root cause: DATABASE_URL undefined\n[${running?'…':'✓'}] Generate minimal patch\n[${fixed?'✓':'…'}] Run unit + integration tests\n[${fixed?'✓':'…'}] Security self-review\n[${fixed?'✓':'…'}] Create Pull Request\n\n> ${fixed?'PR #184 ready for human approval':'Agent waiting for execution'}`}</pre></div><button className="primary widebtn" onClick={runFix}>{running?'Analyzing & fixing…':fixed?'Re-run agent':'Start autonomous fix'} <ChevronRight size={17}/></button></div><div className="panel"><div className="panelhead"><div><h2>Proposed Change</h2><p>Minimal patch · 6 lines</p></div><Code2/></div><div className="diff"><div className="remove">− const url = process.env.DB_URL;</div><div className="add">+ const url = process.env.DATABASE_URL;</div><div className="muted">Tests: 18/18 passed<br/>Security: no new issues<br/>Review confidence: 97%</div></div></div></section>}
function PRPanel(){return <section className="panel full"><div className="panelhead"><div><h2>Pull Requests</h2><p>AI-generated changes awaiting merge</p></div></div><div className="pr"><GitPullRequest/><div><b>Fix missing DATABASE_URL reference</b><p>PR #184 · Dev ← fix/inc-1042 · 2 files changed</p></div><span className="status"><i/>Checks passed</span><button className="ghost">Review <ChevronRight size={15}/></button></div><div className="pr"><GitPullRequest/><div><b>Handle undefined order controller</b><p>PR #181 · Dev ← fix/inc-1041 · 1 file changed</p></div><span className="status"><i/>Merged</span><button className="ghost">Open <ChevronRight size={15}/></button></div></section>}
createRoot(document.getElementById('root')).render(<App/>);
