interface Props {
  toggle: () => void;
}

export default function SidebarButton({ toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="p-3 bg-gray-200 rounded shadow hover:bg-gray-300 transition"
    >
      ☰
    </button>
  );
}
