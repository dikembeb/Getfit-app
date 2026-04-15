import { useState } from ‘react’;
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, TextInput, Switch } from ‘react-native’;

const G = {
black:’#080808’, dark:’#0f0f0f’, card:’#141414’, card2:’#1a1a1a’,
border:’#222’, lime:’#aaff00’, limeD:’#7acc00’, white:’#f0f0f0’,
grey:’#666’, greyL:’#999’, greyD:’#2a2a2a’, red:’#ff3b3b’,
orange:’#ff8c00’, gold:’#ffd000’, blue:’#38bdf8’, green:’#22c55e’,
};

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function Card({ children, style }) {
return <View style={[styles.card, style]}>{children}</View>;
}
function BB({ children, style }) {
return <Text style={[styles.bb, style]}>{children}</Text>;
}
function BC({ children, style }) {
return <Text style={[styles.bc, style]}>{children}</Text>;
}
function StatPill({ label, value, color }) {
return (
<View style={[styles.statPill, { borderColor: color + ‘44’ }]}>
<BB style={{ fontSize:22, color }}>{value}</BB>
<BC style={{ fontSize:10, color:G.grey, letterSpacing:1 }}>{label}</BC>
</View>
);
}
function ProgressBar({ val, max, color }) {
return (
<View style={styles.progressTrack}>
<View style={[styles.progressFill, {
width:`${Math.min((val/max)*100,100)}%`,
backgroundColor:color
}]}/>
</View>
);
}
function SectionHead({ title, sub }) {
return (
<View style={{ marginBottom:14 }}>
{sub && <BC style={{ fontSize:11, color:G.greyL, letterSpacing:2, marginBottom:4 }}>{sub}</BC>}
<BB style={{ fontSize:24, letterSpacing:2 }}>{title}</BB>
</View>
);
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ onNavigate }) {
const days = [‘M’,‘T’,‘W’,‘T’,‘F’,‘S’,‘S’];
const doneDays = [0,1,3,4];
const quotes = [
‘Pain is temporary. Glory is forever.’,
‘Every rep is a vote for who you're becoming.’,
‘Champions train when nobody's watching.’,
‘Get comfortable being uncomfortable.’,
];
const q = quotes[new Date().getDay() % quotes.length];

return (
<ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
{/* Header */}
<View style={styles.pageHeader}>
<BB style={{ fontSize:24, letterSpacing:2 }}>
GET FIT <Text style={{ color:G.lime }}>OR DIE</Text> TRYING
</BB>
<View style={styles.streakBadge}>
<BC style={{ fontSize:11, color:G.lime }}>🔥 12d</BC>
</View>
</View>

```
  {/* Streak banner */}
  <Card style={styles.streakBanner}>
    <BB style={{ fontSize:18, color:G.lime, marginBottom:4 }}>12-DAY STREAK</BB>
    <BC style={{ fontSize:13, color:G.greyL, marginBottom:14 }}>{q}</BC>
    <TouchableOpacity style={styles.btnLime} onPress={() => onNavigate('workout')}>
      <BC style={{ fontSize:14, color:G.black, letterSpacing:1 }}>LAUNCH WORKOUT</BC>
    </TouchableOpacity>
  </Card>

  {/* Stat pills */}
  <View style={styles.pillRow}>
    <StatPill label="SESSIONS" value="18" color={G.lime} />
    <StatPill label="CAL BURNED" value="420" color={G.orange} />
    <StatPill label="STEPS" value="10.1k" color={G.blue} />
    <StatPill label="SCORE" value="87" color={G.lime} />
  </View>

  {/* Week tracker */}
  <Card style={{ padding:18, marginBottom:14 }}>
    <BC style={styles.sectionLabel}>THIS WEEK</BC>
    <View style={{ flexDirection:'row', gap:6, marginTop:10 }}>
      {days.map((d,i) => (
        <View key={i} style={{ flex:1, alignItems:'center' }}>
          <BC style={{ fontSize:10, color:G.grey, marginBottom:5 }}>{d}</BC>
          <View style={[styles.dayDot, doneDays.includes(i) && styles.dayDotDone]}>
            {doneDays.includes(i) && <BC style={{ fontSize:10, color:G.black }}>✓</BC>}
          </View>
        </View>
      ))}
    </View>
  </Card>

  {/* Today at a glance */}
  <Card style={{ padding:18, marginBottom:14 }}>
    <BC style={styles.sectionLabel}>TODAY AT A GLANCE</BC>
    {[
      { label:'Calories In', val:2200, goal:2400, color:G.lime },
      { label:'Steps',       val:10100, goal:10000, color:G.blue },
      { label:'Miles',       val:4.4,  goal:5,     color:G.orange },
    ].map((s,i) => (
      <View key={i} style={{ marginTop:12 }}>
        <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:5 }}>
          <BC style={{ fontSize:12, color:s.color }}>{s.label}</BC>
          <BC style={{ fontSize:12, color:G.greyL }}>{s.val}</BC>
        </View>
        <ProgressBar val={s.val} max={s.goal} color={s.color}/>
      </View>
    ))}
  </Card>

  {/* GFDT Score */}
  <Card style={{ padding:18, marginBottom:14, backgroundColor:'#0a0a0a', borderColor:G.lime+'33' }}>
    <BC style={styles.sectionLabel}>GFDT SCORE</BC>
    <View style={{ flexDirection:'row', alignItems:'center', gap:16, marginTop:10 }}>
      <View style={{ width:70, height:70, borderRadius:35, borderWidth:3, borderColor:G.lime, alignItems:'center', justifyContent:'center', backgroundColor:'#0d1500' }}>
        <BB style={{ fontSize:26, color:G.lime }}>87</BB>
      </View>
      <View style={{ flex:1 }}>
        <BB style={{ fontSize:18, color:G.lime }}>ELITE</BB>
        <BC style={{ fontSize:12, color:G.greyL, marginTop:2 }}>Top 8% of all users this month</BC>
        <ProgressBar val={87} max={100} color={G.lime}/>
      </View>
    </View>
  </Card>

  <View style={{ height:100 }}/>
</ScrollView>
```

);
}

// ── TRAIN ─────────────────────────────────────────────────────────────────────
const EXERCISES = [
{ name:‘Squat’,             sets:4, reps:‘6-8’,   rest:180, muscle:‘Quads / Glutes’ },
{ name:‘Romanian Deadlift’, sets:3, reps:‘8-10’,  rest:150, muscle:‘Hamstrings’ },
{ name:‘Leg Press’,         sets:3, reps:‘10-12’, rest:120, muscle:‘Quads’ },
{ name:‘Walking Lunge’,     sets:3, reps:‘12’,    rest:90,  muscle:‘Quads / Glutes’ },
{ name:‘Leg Curl’,          sets:3, reps:‘12-15’, rest:90,  muscle:‘Hamstrings’ },
{ name:‘Calf Raise’,        sets:4, reps:‘15-20’, rest:60,  muscle:‘Calves’ },
];

function TrainScreen() {
const [openEx, setOpenEx] = useState(null);
const [sets, setSets] = useState({});
const [timer, setTimer] = useState(null);
const [timerActive, setTimerActive] = useState(false);

const logSet = (exName, setIdx, field, val) => {
const key = exName + ‘-’ + setIdx;
setSets(prev => ({ …prev, [key]: { …prev[key], [field]: val } }));
};

return (
<ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
<View style={styles.pageHeader}>
<BB style={{ fontSize:24, letterSpacing:2 }}>TODAY’S WORKOUT</BB>
<View style={styles.streakBadge}>
<BC style={{ fontSize:11, color:G.lime }}>LOWER BODY</BC>
</View>
</View>

```
  {/* Workout meta */}
  <Card style={{ padding:18, marginBottom:14 }}>
    <View style={{ flexDirection:'row', justifyContent:'space-around' }}>
      {[{label:'EXERCISES',val:'6'},{label:'EST. TIME',val:'55 min'},{label:'VOLUME',val:'~12k lbs'}].map((m,i) => (
        <View key={i} style={{ alignItems:'center', gap:4 }}>
          <BB style={{ fontSize:20, color:G.lime }}>{m.val}</BB>
          <BC style={{ fontSize:9, color:G.grey, letterSpacing:1 }}>{m.label}</BC>
        </View>
      ))}
    </View>
  </Card>

  {/* Exercise list */}
  {EXERCISES.map((ex, idx) => {
    const isOpen = openEx === ex.name;
    const allSets = Array.from({ length:ex.sets }, (_,s) => sets[ex.name+'-'+s] || {});
    const allDone = allSets.every(s => s.done);
    return (
      <Card key={ex.name} style={{ marginBottom:10, overflow:'hidden', borderColor: allDone ? G.lime : G.border }}>
        <TouchableOpacity style={styles.exHeader} onPress={() => setOpenEx(isOpen ? null : ex.name)}>
          <View style={[styles.exNum, allDone && { backgroundColor:G.lime }]}>
            <BB style={{ fontSize:14, color:G.black }}>{allDone ? '✓' : idx+1}</BB>
          </View>
          <View style={{ flex:1 }}>
            <BB style={{ fontSize:16 }}>{ex.name}</BB>
            <BC style={{ fontSize:11, color:G.greyL, marginTop:2 }}>
              {ex.muscle} · {ex.sets} sets · {ex.reps} reps
            </BC>
          </View>
          <BC style={{ fontSize:18, color:G.grey }}>{isOpen ? '▲' : '▼'}</BC>
        </TouchableOpacity>

        {isOpen && (
          <View style={{ borderTopWidth:1, borderTopColor:G.border, padding:14 }}>
            <View style={{ flexDirection:'row', marginBottom:10, gap:8 }}>
              <BC style={[styles.setLabel, { flex:0.5 }]}>SET</BC>
              <BC style={styles.setLabel}>WEIGHT</BC>
              <BC style={styles.setLabel}>REPS</BC>
              <BC style={styles.setLabel}>RPE</BC>
            </View>
            {Array.from({ length:ex.sets }, (_,s) => {
              const key = ex.name+'-'+s;
              const sd = sets[key] || {};
              return (
                <View key={s} style={{ flexDirection:'row', alignItems:'center', gap:8, marginBottom:10 }}>
                  <BC style={{ flex:0.5, textAlign:'center', color:G.greyL }}>{s+1}</BC>
                  {['weight','reps'].map(field => (
                    <View key={field} style={styles.inputWrap}>
                      <TouchableOpacity style={styles.inputBtn}
                        onPress={() => logSet(ex.name,s,field,Math.max(0,(sd[field]||0)-(field==='weight'?5:1)))}>
                        <Text style={{ color:G.lime, fontSize:18 }}>-</Text>
                      </TouchableOpacity>
                      <BC style={{ flex:1, textAlign:'center', fontSize:14 }}>{sd[field]||0}</BC>
                      <TouchableOpacity style={styles.inputBtn}
                        onPress={() => logSet(ex.name,s,field,(sd[field]||0)+(field==='weight'?5:1))}>
                        <Text style={{ color:G.lime, fontSize:18 }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <View style={{ flexDirection:'row', gap:3 }}>
                    {[7,8,9,10].map(r => (
                      <TouchableOpacity key={r} onPress={() => logSet(ex.name,s,'rpe',r)}
                        style={[styles.rpeBtn, sd.rpe===r && { backgroundColor:G.lime }]}>
                        <BC style={{ fontSize:10, color:sd.rpe===r ? G.black : G.grey }}>{r}</BC>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              );
            })}
            <TouchableOpacity
              style={[styles.btnLime, { alignSelf:'stretch', alignItems:'center', marginTop:8 }]}
              onPress={() => {
                Array.from({ length:ex.sets }, (_,s) => logSet(ex.name,s,'done',true));
              }}>
              <BC style={{ fontSize:13, color:G.black, letterSpacing:1 }}>MARK ALL DONE</BC>
            </TouchableOpacity>
            <View style={{ marginTop:10, paddingTop:10, borderTopWidth:1, borderTopColor:G.border }}>
              <BC style={{ fontSize:11, color:G.greyL }}>REST: {ex.rest}s between sets</BC>
            </View>
          </View>
        )}
      </Card>
    );
  })}

  <TouchableOpacity style={[styles.btnLime, { alignSelf:'stretch', alignItems:'center', marginBottom:14 }]}>
    <BB style={{ fontSize:16, color:G.black, letterSpacing:2 }}>FINISH WORKOUT</BB>
  </TouchableOpacity>
  <View style={{ height:100 }}/>
</ScrollView>
```

);
}

// ── FUEL ──────────────────────────────────────────────────────────────────────
function FuelScreen() {
const [meals, setMeals] = useState([
{ id:1, time:‘8:00 AM’,  label:‘Breakfast’, cal:520, protein:38, carbs:52, fat:14 },
{ id:2, time:‘12:30 PM’, label:‘Lunch’,     cal:680, protein:45, carbs:72, fat:18 },
]);
const [showAdd, setShowAdd] = useState(false);
const [newMeal, setNewMeal] = useState(’’);

const totals = meals.reduce((acc,m) => ({
cal:acc.cal+m.cal, protein:acc.protein+m.protein,
carbs:acc.carbs+m.carbs, fat:acc.fat+m.fat,
}), { cal:0, protein:0, carbs:0, fat:0 });

const goal = { cal:2400, protein:180, carbs:240, fat:70 };

return (
<ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
<View style={styles.pageHeader}>
<BB style={{ fontSize:24, letterSpacing:2 }}>FUEL</BB>
<View style={styles.streakBadge}>
<BC style={{ fontSize:11, color:G.lime }}>TODAY</BC>
</View>
</View>

```
  {/* Calorie summary */}
  <Card style={{ padding:18, marginBottom:14 }}>
    <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
      <View>
        <BB style={{ fontSize:48, color:G.lime, lineHeight:52 }}>{totals.cal}</BB>
        <BC style={{ fontSize:11, color:G.grey, letterSpacing:1 }}>OF {goal.cal} KCAL</BC>
      </View>
      <View style={{ alignItems:'flex-end' }}>
        <BC style={{ fontSize:12, color:G.greyL, marginBottom:4 }}>Remaining</BC>
        <BB style={{ fontSize:32, color:goal.cal-totals.cal > 0 ? G.lime : G.red }}>
          {goal.cal-totals.cal}
        </BB>
      </View>
    </View>
    <ProgressBar val={totals.cal} max={goal.cal} color={totals.cal > goal.cal ? G.red : G.lime}/>
  </Card>

  {/* Macro split */}
  <View style={{ flexDirection:'row', gap:8, marginBottom:14 }}>
    {[
      { label:'PROTEIN', val:totals.protein, goal:goal.protein, color:G.blue,   unit:'g' },
      { label:'CARBS',   val:totals.carbs,   goal:goal.carbs,   color:G.orange, unit:'g' },
      { label:'FAT',     val:totals.fat,     goal:goal.fat,     color:G.gold,   unit:'g' },
    ].map((m,i) => (
      <Card key={i} style={{ flex:1, padding:12, marginBottom:0 }}>
        <BB style={{ fontSize:20, color:m.color }}>{m.val}<BC style={{ fontSize:10, color:G.grey }}>{m.unit}</BC></BB>
        <BC style={{ fontSize:9, color:G.grey, letterSpacing:1, marginBottom:6 }}>{m.label}</BC>
        <ProgressBar val={m.val} max={m.goal} color={m.color}/>
        <BC style={{ fontSize:9, color:G.greyL, marginTop:4 }}>/ {m.goal}{m.unit}</BC>
      </Card>
    ))}
  </View>

  {/* Meal list */}
  <BC style={[styles.sectionLabel, { marginBottom:10 }]}>MEALS TODAY</BC>
  {meals.map(m => (
    <Card key={m.id} style={{ padding:16, marginBottom:10 }}>
      <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <View>
          <BB style={{ fontSize:15 }}>{m.label}</BB>
          <BC style={{ fontSize:11, color:G.grey }}>{m.time}</BC>
        </View>
        <BB style={{ fontSize:18, color:G.lime }}>{m.cal} kcal</BB>
      </View>
      <View style={{ flexDirection:'row', gap:16 }}>
        <BC style={{ fontSize:11, color:G.blue }}>{m.protein}g protein</BC>
        <BC style={{ fontSize:11, color:G.orange }}>{m.carbs}g carbs</BC>
        <BC style={{ fontSize:11, color:G.gold }}>{m.fat}g fat</BC>
      </View>
    </Card>
  ))}

  {/* Add meal */}
  {showAdd ? (
    <Card style={{ padding:16, marginBottom:14 }}>
      <BC style={[styles.sectionLabel, { marginBottom:10 }]}>DESCRIBE YOUR MEAL</BC>
      <TextInput
        style={styles.textInput}
        placeholder="e.g. grilled chicken, rice, broccoli"
        placeholderTextColor={G.grey}
        value={newMeal}
        onChangeText={setNewMeal}
        multiline
      />
      <View style={{ flexDirection:'row', gap:8, marginTop:12 }}>
        <TouchableOpacity style={[styles.btnLime, { flex:1, alignItems:'center' }]}
          onPress={() => {
            if(newMeal.trim()) {
              setMeals(prev => [...prev, {
                id: Date.now(), time:'Now',
                label: newMeal.trim().slice(0,30),
                cal:450, protein:32, carbs:48, fat:12
              }]);
              setNewMeal('');
              setShowAdd(false);
            }
          }}>
          <BC style={{ fontSize:13, color:G.black, letterSpacing:1 }}>ADD MEAL</BC>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnGhost, { flex:1, alignItems:'center' }]}
          onPress={() => setShowAdd(false)}>
          <BC style={{ fontSize:13, color:G.white, letterSpacing:1 }}>CANCEL</BC>
        </TouchableOpacity>
      </View>
    </Card>
  ) : (
    <TouchableOpacity style={[styles.btnLime, { alignSelf:'stretch', alignItems:'center', marginBottom:14 }]}
      onPress={() => setShowAdd(true)}>
      <BB style={{ fontSize:15, color:G.black, letterSpacing:1 }}>+ LOG MEAL</BB>
    </TouchableOpacity>
  )}

  {/* AI note */}
  <Card style={{ padding:16, marginBottom:14, backgroundColor:'#0d1500', borderColor:G.lime+'44' }}>
    <BB style={{ fontSize:13, color:G.lime, marginBottom:4 }}>AI MACRO ESTIMATOR</BB>
    <BC style={{ fontSize:12, color:G.greyL, lineHeight:18 }}>
      Describe your meal or take a photo and Claude AI will estimate your macros instantly. Full AI integration coming in next update.
    </BC>
  </Card>

  <View style={{ height:100 }}/>
</ScrollView>
```

);
}

// ── STEPS ─────────────────────────────────────────────────────────────────────
function StepsScreen() {
const [steps] = useState(10143);
const [tracking, setTracking] = useState(false);
const stepGoal = 10000;
const pct = Math.min(Math.round((steps/stepGoal)*100), 100);
const miles = (steps * 0.000762).toFixed(2);
const calories = Math.round(steps * 0.04);
const floors = 8;

return (
<ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
<View style={styles.pageHeader}>
<BB style={{ fontSize:24, letterSpacing:2 }}>STEPS</BB>
<View style={styles.streakBadge}>
<BC style={{ fontSize:11, color:G.lime }}>TODAY</BC>
</View>
</View>

```
  {/* Big step count */}
  <Card style={{ padding:24, marginBottom:14, alignItems:'center' }}>
    <BB style={{ fontSize:72, color:G.lime, lineHeight:76 }}>{steps.toLocaleString()}</BB>
    <BC style={{ fontSize:13, color:G.grey, letterSpacing:2, marginBottom:16 }}>STEPS TODAY</BC>
    <View style={{ width:'100%', marginBottom:8 }}>
      <ProgressBar val={steps} max={stepGoal} color={G.lime}/>
    </View>
    <BC style={{ fontSize:12, color:G.greyL }}>{pct}% of {stepGoal.toLocaleString()} goal</BC>
  </Card>

  {/* Stats grid */}
  <View style={{ flexDirection:'row', gap:10, marginBottom:14 }}>
    <Card style={{ flex:1, padding:16, marginBottom:0, alignItems:'center' }}>
      <BB style={{ fontSize:28, color:G.orange }}>{miles}</BB>
      <BC style={{ fontSize:10, color:G.grey, letterSpacing:1, marginTop:4 }}>MILES</BC>
    </Card>
    <Card style={{ flex:1, padding:16, marginBottom:0, alignItems:'center' }}>
      <BB style={{ fontSize:28, color:G.blue }}>{calories}</BB>
      <BC style={{ fontSize:10, color:G.grey, letterSpacing:1, marginTop:4 }}>CALORIES</BC>
    </Card>
    <Card style={{ flex:1, padding:16, marginBottom:0, alignItems:'center' }}>
      <BB style={{ fontSize:28, color:G.gold }}>{floors}</BB>
      <BC style={{ fontSize:10, color:G.grey, letterSpacing:1, marginTop:4 }}>FLOORS</BC>
    </Card>
  </View>

  {/* Tracking button */}
  <TouchableOpacity
    style={[tracking ? styles.btnGhost : styles.btnLime, { alignSelf:'stretch', alignItems:'center', marginBottom:14 }]}
    onPress={() => setTracking(t => !t)}>
    <BB style={{ fontSize:15, color: tracking ? G.white : G.black, letterSpacing:1 }}>
      {tracking ? '⏹ STOP TRACKING' : '▶ START TRACKING'}
    </BB>
  </TouchableOpacity>

  {/* Alpha note */}
  <Card style={{ padding:14, marginBottom:14, backgroundColor:'rgba(255,208,0,0.06)', borderColor:G.gold+'44' }}>
    <BB style={{ fontSize:12, color:G.gold, marginBottom:4 }}>ALPHA — KEEP APP OPEN WHILE WALKING</BB>
    <BC style={{ fontSize:11, color:G.greyL, lineHeight:16 }}>
      Background tracking requires the native app. Full HealthKit sync coming Q3 2026.
    </BC>
  </Card>

  {/* Weekly view */}
  <Card style={{ padding:18, marginBottom:14 }}>
    <BC style={[styles.sectionLabel, { marginBottom:12 }]}>THIS WEEK</BC>
    {[
      { day:'Mon', steps:12400 },
      { day:'Tue', steps:8900 },
      { day:'Wed', steps:10143 },
      { day:'Thu', steps:0 },
      { day:'Fri', steps:0 },
      { day:'Sat', steps:0 },
      { day:'Sun', steps:0 },
    ].map((d,i) => (
      <View key={i} style={{ flexDirection:'row', alignItems:'center', gap:10, marginBottom:8 }}>
        <BC style={{ width:30, fontSize:12, color:G.greyL }}>{d.day}</BC>
        <View style={{ flex:1 }}>
          <ProgressBar val={d.steps} max={10000} color={d.steps >= 10000 ? G.lime : G.blue}/>
        </View>
        <BC style={{ width:50, fontSize:11, color:G.greyL, textAlign:'right' }}>
          {d.steps > 0 ? d.steps.toLocaleString() : '--'}
        </BC>
      </View>
    ))}
  </Card>

  <View style={{ height:100 }}/>
</ScrollView>
```

);
}

// ── STATS ─────────────────────────────────────────────────────────────────────
function StatsScreen() {
const [tab, setTab] = useState(‘progress’);

const photos = [
{ week:12, date:‘Mar 17’, note:‘Shoulder definition improving. Upper chest development progressing.’ },
{ week:11, date:‘Mar 10’, note:‘Core engagement stronger. Slight vascularity increase in forearms.’ },
{ week:10, date:‘Mar 3’,  note:‘Posture noticeably improved. Shoulder width appears broader.’ },
];

const prs = [
{ ex:‘Squat’,      weight:‘315 lbs’, date:‘Mar 20’, reps:3 },
{ ex:‘Bench Press’,weight:‘225 lbs’, date:‘Mar 15’, reps:5 },
{ ex:‘Deadlift’,   weight:‘405 lbs’, date:‘Mar 10’, reps:1 },
{ ex:‘OHP’,        weight:‘145 lbs’, date:‘Mar 5’,  reps:5 },
];

return (
<ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
<View style={styles.pageHeader}>
<BB style={{ fontSize:24, letterSpacing:2 }}>STATS</BB>
</View>

```
  {/* Tab switcher */}
  <View style={styles.tabRow}>
    {['progress','prs','scores'].map(t => (
      <TouchableOpacity key={t} style={[styles.tabBtn, tab===t && styles.tabBtnActive]}
        onPress={() => setTab(t)}>
        <BC style={{ fontSize:11, letterSpacing:1, color: tab===t ? G.black : G.grey }}>
          {t === 'prs' ? 'PRs' : t.toUpperCase()}
        </BC>
      </TouchableOpacity>
    ))}
  </View>

  {tab === 'progress' && (
    <View>
      <TouchableOpacity style={[styles.btnLime, { alignSelf:'stretch', alignItems:'center', marginBottom:14 }]}>
        <BB style={{ fontSize:14, color:G.black, letterSpacing:1 }}>📸 ADD THIS WEEK'S PHOTO</BB>
      </TouchableOpacity>

      {photos.map((p,i) => (
        <Card key={i} style={{ padding:16, marginBottom:10 }}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:8 }}>
            <BB style={{ fontSize:15 }}>Week {p.week}</BB>
            <BC style={{ fontSize:12, color:G.grey }}>{p.date}</BC>
          </View>
          <View style={{ height:120, backgroundColor:G.card2, borderRadius:10, alignItems:'center', justifyContent:'center', marginBottom:10 }}>
            <BC style={{ fontSize:12, color:G.greyD }}>Photo</BC>
          </View>
          <BC style={{ fontSize:12, color:G.greyL, lineHeight:18 }}>{p.note}</BC>
        </Card>
      ))}

      {/* Pick Me Up */}
      <Card style={{ padding:16, marginBottom:14, backgroundColor:'#0d1500', borderColor:G.lime+'44' }}>
        <BB style={{ fontSize:14, color:G.lime, marginBottom:6 }}>PICK ME UP</BB>
        <BC style={{ fontSize:12, color:G.greyL, lineHeight:18, marginBottom:12 }}>
          Feeling low? Claude reads your entire journey and gives you a personalized message.
        </BC>
        <TouchableOpacity style={[styles.btnLime, { alignSelf:'flex-start' }]}>
          <BC style={{ fontSize:13, color:G.black, letterSpacing:1 }}>MOTIVATE ME</BC>
        </TouchableOpacity>
      </Card>
    </View>
  )}

  {tab === 'prs' && (
    <View>
      <BC style={[styles.sectionLabel, { marginBottom:12 }]}>PERSONAL RECORDS</BC>
      {prs.map((pr,i) => (
        <Card key={i} style={{ padding:16, marginBottom:10 }}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            <View>
              <BB style={{ fontSize:16 }}>{pr.ex}</BB>
              <BC style={{ fontSize:11, color:G.grey, marginTop:2 }}>{pr.date} · {pr.reps} reps</BC>
            </View>
            <BB style={{ fontSize:22, color:G.gold }}>{pr.weight}</BB>
          </View>
        </Card>
      ))}
    </View>
  )}

  {tab === 'scores' && (
    <View>
      <Card style={{ padding:18, marginBottom:14 }}>
        <BC style={[styles.sectionLabel, { marginBottom:12 }]}>GFDT SCORE BREAKDOWN</BC>
        {[
          { label:'Consistency', val:35, max:40, color:G.lime },
          { label:'Streak Bonus', val:18, max:20, color:G.blue },
          { label:'Strength Output', val:22, max:25, color:G.orange },
          { label:'Nutrition', val:8,  max:10, color:G.gold },
          { label:'PRs Set',   val:4,  max:5,  color:G.green },
        ].map((s,i) => (
          <View key={i} style={{ marginBottom:12 }}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:5 }}>
              <BC style={{ fontSize:12, color:s.color }}>{s.label}</BC>
              <BC style={{ fontSize:12, color:G.greyL }}>{s.val}/{s.max}</BC>
            </View>
            <ProgressBar val={s.val} max={s.max} color={s.color}/>
          </View>
        ))}
        <View style={{ borderTopWidth:1, borderTopColor:G.border, paddingTop:12, marginTop:4 }}>
          <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
            <BB style={{ fontSize:16 }}>TOTAL SCORE</BB>
            <BB style={{ fontSize:24, color:G.lime }}>87</BB>
          </View>
        </View>
      </Card>

      {/* Monthly history */}
      <BC style={[styles.sectionLabel, { marginBottom:10 }]}>MONTHLY HISTORY</BC>
      {[
        { month:'March 2026', score:87, rank:'ELITE' },
        { month:'February 2026', score:79, rank:'BEAST' },
        { month:'January 2026', score:71, rank:'BEAST' },
      ].map((h,i) => (
        <Card key={i} style={{ padding:14, marginBottom:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
          <View>
            <BB style={{ fontSize:14 }}>{h.month}</BB>
            <BC style={{ fontSize:11, color:G.greyL, marginTop:2 }}>{h.rank}</BC>
          </View>
          <BB style={{ fontSize:28, color:G.lime }}>{h.score}</BB>
        </Card>
      ))}
    </View>
  )}

  <View style={{ height:100 }}/>
</ScrollView>
```

);
}

// ── RANKS ─────────────────────────────────────────────────────────────────────
function RanksScreen() {
const [tab, setTab] = useState(‘friends’);

const friends = [
{ name:‘You’,    score:87, rank:‘ELITE’,   change:’+2’ },
{ name:‘Marcus’, score:84, rank:‘ELITE’,   change:’+1’ },
{ name:‘Jordan’, score:79, rank:‘BEAST’,   change:’-1’ },
{ name:‘Devon’,  score:71, rank:‘BEAST’,   change:‘0’  },
{ name:‘Chris’,  score:58, rank:‘GRINDER’, change:’+3’ },
];

const global = [
{ name:‘KingRep99’,   score:99, rank:‘ELITE’ },
{ name:‘IronMike’,    score:97, rank:‘ELITE’ },
{ name:‘GrindDaily’,  score:95, rank:‘ELITE’ },
{ name:‘BeastMode’,   score:93, rank:‘ELITE’ },
{ name:‘LiftOrDie’,   score:91, rank:‘ELITE’ },
{ name:‘You’,         score:87, rank:‘ELITE’ },
{ name:‘StrongArm’,   score:85, rank:‘ELITE’ },
];

const list = tab === ‘friends’ ? friends : global;

return (
<ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
<View style={styles.pageHeader}>
<BB style={{ fontSize:24, letterSpacing:2 }}>RANKS</BB>
<View style={styles.streakBadge}>
<BC style={{ fontSize:11, color:G.lime }}>MARCH</BC>
</View>
</View>

```
  {/* Tab */}
  <View style={styles.tabRow}>
    {['friends','global'].map(t => (
      <TouchableOpacity key={t} style={[styles.tabBtn, tab===t && styles.tabBtnActive]}
        onPress={() => setTab(t)}>
        <BC style={{ fontSize:11, letterSpacing:1, color: tab===t ? G.black : G.grey }}>
          {t.toUpperCase()}
        </BC>
      </TouchableOpacity>
    ))}
  </View>

  {/* Podium top 3 */}
  {tab === 'friends' && (
    <Card style={{ padding:18, marginBottom:14, alignItems:'center' }}>
      <View style={{ flexDirection:'row', alignItems:'flex-end', gap:12 }}>
        {[friends[1], friends[0], friends[2]].map((f,i) => {
          const heights = [80, 100, 60];
          const colors = [G.greyL, G.gold, G.orange];
          const labels = ['2nd', '1st', '3rd'];
          return (
            <View key={i} style={{ alignItems:'center', gap:6 }}>
              <BC style={{ fontSize:12, color: f.name==='You' ? G.lime : G.greyL }}>{f.name}</BC>
              <BB style={{ fontSize:16, color:colors[i] }}>{f.score}</BB>
              <View style={{ width:60, height:heights[i], backgroundColor: f.name==='You' ? G.lime+'22' : G.card2, borderRadius:8, borderWidth:1, borderColor:colors[i]+'66', alignItems:'center', justifyContent:'flex-end', paddingBottom:6 }}>
                <BC style={{ fontSize:11, color:colors[i] }}>{labels[i]}</BC>
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  )}

  {/* Full list */}
  {list.map((u,i) => (
    <Card key={i} style={{ padding:14, marginBottom:8, backgroundColor: u.name==='You' ? '#0d1f00' : G.card, borderColor: u.name==='You' ? G.lime+'44' : G.border }}>
      <View style={{ flexDirection:'row', alignItems:'center', gap:12 }}>
        <BB style={{ fontSize:18, color:G.greyD, width:28 }}>#{i+1}</BB>
        <View style={{ width:36, height:36, borderRadius:18, backgroundColor:G.card2, alignItems:'center', justifyContent:'center' }}>
          <BC style={{ fontSize:14, color: u.name==='You' ? G.lime : G.greyL }}>{u.name[0]}</BC>
        </View>
        <View style={{ flex:1 }}>
          <BB style={{ fontSize:15, color: u.name==='You' ? G.lime : G.white }}>{u.name}</BB>
          <BC style={{ fontSize:11, color:G.grey, marginTop:2 }}>{u.rank}</BC>
        </View>
        <View style={{ alignItems:'flex-end' }}>
          <BB style={{ fontSize:22, color: u.name==='You' ? G.lime : G.white }}>{u.score}</BB>
          {u.change && (
            <BC style={{ fontSize:11, color: u.change.startsWith('+') ? G.green : u.change === '0' ? G.grey : G.red }}>
              {u.change}
            </BC>
          )}
        </View>
      </View>
    </Card>
  ))}

  <View style={{ height:100 }}/>
</ScrollView>
```

);
}

// ── SETTINGS ──────────────────────────────────────────────────────────────────
function SettingsScreen() {
const [units, setUnits] = useState(‘imperial’);
const [notifications, setNotifications] = useState(true);
const [darkMode, setDarkMode] = useState(true);

const SettingRow = ({ label, right }) => (
<View style={styles.settingRow}>
<BC style={{ fontSize:15 }}>{label}</BC>
{right}
</View>
);

return (
<ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
<View style={styles.pageHeader}>
<BB style={{ fontSize:24, letterSpacing:2 }}>SETTINGS</BB>
</View>

```
  {/* Profile */}
  <BC style={[styles.sectionLabel, { marginBottom:10 }]}>PROFILE</BC>
  <Card style={{ padding:16, marginBottom:14 }}>
    {[
      { label:'Name', val:'Alex' },
      { label:'Age', val:'28' },
      { label:'Weight', val:'185 lbs' },
      { label:'Height', val:'5\'11"' },
      { label:'Goal', val:'Build Muscle' },
    ].map((p,i) => (
      <View key={i} style={[styles.settingRow, { borderBottomWidth: i<4 ? 1 : 0, borderBottomColor:G.border }]}>
        <BC style={{ fontSize:14, color:G.greyL }}>{p.label}</BC>
        <BB style={{ fontSize:14 }}>{p.val}</BB>
      </View>
    ))}
  </Card>

  {/* Training plan */}
  <BC style={[styles.sectionLabel, { marginBottom:10 }]}>TRAINING PLAN</BC>
  <Card style={{ padding:16, marginBottom:14 }}>
    {[
      { label:'Split', val:'Push / Pull / Legs' },
      { label:'Focus', val:'Hypertrophy' },
      { label:'Sport', val:'Basketball' },
      { label:'Duration', val:'6 weeks' },
    ].map((p,i) => (
      <View key={i} style={[styles.settingRow, { borderBottomWidth: i<3 ? 1 : 0, borderBottomColor:G.border }]}>
        <BC style={{ fontSize:14, color:G.greyL }}>{p.label}</BC>
        <BB style={{ fontSize:14, color:G.lime }}>{p.val}</BB>
      </View>
    ))}
    <TouchableOpacity style={[styles.btnLime, { alignSelf:'stretch', alignItems:'center', marginTop:12 }]}>
      <BC style={{ fontSize:13, color:G.black, letterSpacing:1 }}>SWITCH PLAN</BC>
    </TouchableOpacity>
  </Card>

  {/* Preferences */}
  <BC style={[styles.sectionLabel, { marginBottom:10 }]}>PREFERENCES</BC>
  <Card style={{ padding:16, marginBottom:14 }}>
    <SettingRow label="Notifications" right={
      <Switch value={notifications} onValueChange={setNotifications}
        trackColor={{ false:G.greyD, true:G.lime }} thumbColor={G.white}/>
    }/>
    <View style={[styles.settingRow, { borderTopWidth:1, borderTopColor:G.border }]}>
      <BC style={{ fontSize:15 }}>Units</BC>
      <View style={{ flexDirection:'row', gap:8 }}>
        {['imperial','metric'].map(u => (
          <TouchableOpacity key={u} onPress={() => setUnits(u)}
            style={[styles.unitBtn, units===u && { backgroundColor:G.lime, borderColor:G.lime }]}>
            <BC style={{ fontSize:11, color: units===u ? G.black : G.grey, letterSpacing:1 }}>
              {u.toUpperCase()}
            </BC>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </Card>

  {/* Watch sync */}
  <Card style={{ padding:16, marginBottom:14, backgroundColor:'#0d1500', borderColor:G.lime+'33' }}>
    <BB style={{ fontSize:14, color:G.lime, marginBottom:4 }}>APPLE WATCH SYNC</BB>
    <BC style={{ fontSize:12, color:G.greyL, lineHeight:18, marginBottom:12 }}>
      Heart rate during workouts, active calories, rest timer on wrist, and PR notifications. Coming Q3 2026.
    </BC>
    <View style={[styles.streakBadge, { alignSelf:'flex-start' }]}>
      <BC style={{ fontSize:11, color:G.lime }}>COMING Q3 2026</BC>
    </View>
  </Card>

  {/* Account */}
  <BC style={[styles.sectionLabel, { marginBottom:10 }]}>ACCOUNT</BC>
  <Card style={{ padding:16, marginBottom:14 }}>
    {['Export My Data', 'Privacy Policy', 'Terms of Service', 'Sign Out'].map((item,i) => (
      <TouchableOpacity key={i} style={[styles.settingRow, { borderBottomWidth: i<3 ? 1 : 0, borderBottomColor:G.border }]}>
        <BC style={{ fontSize:15, color: item==='Sign Out' ? G.red : G.white }}>{item}</BC>
        <BC style={{ fontSize:16, color:G.grey }}>›</BC>
      </TouchableOpacity>
    ))}
  </Card>

  <View style={{ height:100 }}/>
</ScrollView>
```

);
}

// ── NAV ───────────────────────────────────────────────────────────────────────
const NAV = [
{ id:‘dashboard’,   label:‘Home’     },
{ id:‘workout’,     label:‘Train’    },
{ id:‘nutrition’,   label:‘Fuel’     },
{ id:‘activity’,    label:‘Steps’    },
{ id:‘progress’,    label:‘Stats’    },
{ id:‘leaderboard’, label:‘Ranks’    },
{ id:‘settings’,    label:‘Settings’ },
];

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
const [page, setPage] = useState(‘dashboard’);

const renderPage = () => {
switch(page) {
case ‘dashboard’:   return <Dashboard onNavigate={setPage} />;
case ‘workout’:     return <TrainScreen />;
case ‘nutrition’:   return <FuelScreen />;
case ‘activity’:    return <StepsScreen />;
case ‘progress’:    return <StatsScreen />;
case ‘leaderboard’: return <RanksScreen />;
case ‘settings’:    return <SettingsScreen />;
default:            return <Dashboard onNavigate={setPage} />;
}
};

return (
<View style={styles.root}>
<StatusBar barStyle="light-content" backgroundColor={G.black} />
<View style={{ flex:1 }}>{renderPage()}</View>
<View style={styles.bottomNav}>
{NAV.map(n => {
const active = page === n.id;
return (
<TouchableOpacity key={n.id} style={styles.navBtn} onPress={() => setPage(n.id)}>
<BC style={[styles.navLabel, { color: active ? G.lime : G.grey }]}>{n.label}</BC>
{active && <View style={styles.navDot}/>}
</TouchableOpacity>
);
})}
</View>
</View>
);
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
root:         { flex:1, backgroundColor:G.black },
page:         { flex:1, backgroundColor:G.black, paddingHorizontal:16 },
pageHeader:   { flexDirection:‘row’, justifyContent:‘space-between’, alignItems:‘center’, paddingTop:20, paddingBottom:16 },
card:         { backgroundColor:G.card, borderWidth:1, borderColor:G.border, borderRadius:14, marginBottom:14 },
bb:           { fontWeight:‘900’, color:G.white },
bc:           { fontWeight:‘700’, color:G.white },
sectionLabel: { fontSize:11, color:G.greyL, letterSpacing:2, textTransform:‘uppercase’ },
streakBadge:  { backgroundColor:’#0d1f00’, borderWidth:1, borderColor:G.lime+‘44’, borderRadius:20, paddingHorizontal:12, paddingVertical:4 },
streakBanner: { padding:20, marginBottom:14, backgroundColor:’#0d1500’, borderColor:G.lime+‘44’ },
btnLime:      { backgroundColor:G.lime, borderRadius:10, paddingVertical:12, paddingHorizontal:20, alignSelf:‘flex-start’ },
btnGhost:     { backgroundColor:‘transparent’, borderRadius:10, paddingVertical:12, paddingHorizontal:20, alignSelf:‘flex-start’, borderWidth:1, borderColor:G.border },
pillRow:      { flexDirection:‘row’, gap:8, marginBottom:14 },
statPill:     { flex:1, backgroundColor:G.card, borderWidth:1, borderRadius:12, padding:12, alignItems:‘center’, gap:4 },
dayDot:       { width:32, height:32, borderRadius:8, backgroundColor:G.card2, borderWidth:1, borderColor:G.border, alignItems:‘center’, justifyContent:‘center’ },
dayDotDone:   { backgroundColor:G.lime, borderColor:G.lime },
progressTrack:{ height:6, backgroundColor:G.border, borderRadius:6, overflow:‘hidden’ },
progressFill: { height:‘100%’, borderRadius:6 },
exHeader:     { flexDirection:‘row’, alignItems:‘center’, padding:16, gap:12 },
exNum:        { width:28, height:28, borderRadius:7, backgroundColor:G.lime, alignItems:‘center’, justifyContent:‘center’ },
setLabel:     { flex:1, fontSize:9, color:G.grey, letterSpacing:1, textAlign:‘center’ },
inputWrap:    { flex:1, flexDirection:‘row’, alignItems:‘center’, backgroundColor:G.card2, borderRadius:8, overflow:‘hidden’ },
inputBtn:     { padding:6, alignItems:‘center’, justifyContent:‘center’, width:32 },
rpeBtn:       { width:28, height:28, borderRadius:6, backgroundColor:G.greyD, alignItems:‘center’, justifyContent:‘center’ },
tabRow:       { flexDirection:‘row’, backgroundColor:G.card, borderWidth:1, borderColor:G.border, borderRadius:10, overflow:‘hidden’, marginBottom:14 },
tabBtn:       { flex:1, paddingVertical:10, alignItems:‘center’ },
tabBtnActive: { backgroundColor:G.lime },
textInput:    { backgroundColor:G.card2, borderWidth:1, borderColor:G.border, borderRadius:10, padding:12, color:G.white, fontSize:14, minHeight:80, textAlignVertical:‘top’ },
settingRow:   { flexDirection:‘row’, justifyContent:‘space-between’, alignItems:‘center’, paddingVertical:12 },
unitBtn:      { paddingVertical:6, paddingHorizontal:12, borderRadius:8, borderWidth:1, borderColor:G.border },
bottomNav:    { flexDirection:‘row’, backgroundColor:G.black, borderTopWidth:1, borderTopColor:G.border, paddingBottom:24, paddingTop:8 },
navBtn:       { flex:1, alignItems:‘center’, gap:3 },
navLabel:     { fontSize:9, letterSpacing:0.5, textTransform:‘uppercase’ },
navDot:       { width:16, height:2, borderRadius:2, backgroundColor:G.lime },
});