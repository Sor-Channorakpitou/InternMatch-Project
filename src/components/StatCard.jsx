// src/components/StatCard.jsx

// Props: label (string), value (string|number), color ("blue"|"green"|"amber"|"purple"|"teal"),
//        icon (Lucide component), sub (optional subtitle string)
export default function StatCard({ label, value, color = "blue", icon: Icon, sub }) {

  // TODO [FRIEND]: Define a color map object
  // Map each color name to Tailwind bg + text classes. Example:
  // const colorMap = {
  //   blue:   { wrap: "bg-blue-50",   icon: "text-blue-600",   val: "text-blue-900" },
  //   green:  { wrap: "bg-green-50",  icon: "text-green-600",  val: "text-green-900" },
  //   amber:  { wrap: "bg-amber-50",  icon: "text-amber-600",  val: "text-amber-900" },
  //   purple: { wrap: "bg-purple-50", icon: "text-purple-600", val: "text-purple-900" },
  //   teal:   { wrap: "bg-teal-50",   icon: "text-teal-600",   val: "text-teal-900" },
  // }

  // TODO [FRIEND]: const c = colorMap[color] || colorMap.blue

  return (
    <div className={`rounded-2xl p-5 flex items-start gap-4 ${/* TODO [FRIEND]: c.wrap */""}`}>

      {/* Icon box */}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${/* TODO [FRIEND]: lighter bg */""}`}>
        {/* TODO [FRIEND]: Render <Icon size={22} /> with c.icon color class */}
      </div>

      {/* Text */}
      <div>
        {/* TODO [FRIEND]: value — text-2xl font-bold, using c.val */}
        {/* TODO [FRIEND]: label — text-sm, slightly muted color */}
        {/* TODO [FRIEND]: if sub exists, render it as text-xs even more muted */}
      </div>
    </div>
  );
}
