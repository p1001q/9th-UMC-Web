// src/components/NavigationButtons.tsx
import { useNavigate } from "react-router-dom";

interface NavigationButtonsProps {
  backPath?: string; // 뒤로가기 경로 (없으면 history.back)
  forwardPath?: string; // 앞으로가기 경로 (선택)
}

const NavigationButtons = ({ backPath, forwardPath }: NavigationButtonsProps) => {
  const navigate = useNavigate();

  return (
  <div className="absolute top-5 left-5 flex gap-3">
    {backPath && (
        <button
        onClick={() => (backPath ? navigate(backPath) : navigate(-1))}
        className="text-2xl font-bold text-gray-600 hover:text-gray-900"
        >
        &lt;
        </button>
    )}
    
    {forwardPath && (
        <button
          onClick={() => navigate(forwardPath)}
          className="text-2xl font-bold text-gray-600 hover:text-gray-900"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
