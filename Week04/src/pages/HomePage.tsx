import NavigationButtons from "../components/NavigationButtons";

const HomePage = () => {
  return (
    <div className="relative min-h-dvh">
      <NavigationButtons forwardPath="/login" />
      <div className="pt-16 pl-14 text-xl font-semibold">HomePage</div>
    </div>
  )
}

export default HomePage;
