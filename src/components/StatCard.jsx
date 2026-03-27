// src/components/StatCard.jsx

export default function StatCard({ label, value, color = "blue", icon: Icon, sub }) {
  const colorMap = {
    blue:   { wrap: "bg-blue-50",   icon: "text-blue-600",   iconBg: "bg-blue-100",   val: "text-blue-900" },
    green:  { wrap: "bg-green-50",  icon: "text-green-600",  iconBg: "bg-green-100",  val: "text-green-900" },
    amber:  { wrap: "bg-amber-50",  icon: "text-amber-600",  iconBg: "bg-amber-100",  val: "text-amber-900" },
    purple: { wrap: "bg-purple-50", icon: "text-purple-600", iconBg: "bg-purple-100", val: "text-purple-900" },
    teal:   { wrap: "bg-teal-50",   icon: "text-teal-600",   iconBg: "bg-teal-100",   val: "text-teal-900" },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`rounded-2xl p-5 flex items-start gap-4 ${c.wrap}`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${c.iconBg}`}>
        {Icon && <Icon size={22} className={c.icon} />}
      </div>
      <div>
        <div className={`text-2xl font-bold ${c.val}`}>{value}</div>
        <div className="text-sm text-gray-500 font-medium">{label}</div>
        {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}