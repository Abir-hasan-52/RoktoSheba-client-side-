import useAuth from "../../../Hooks/useAuth";
import Welcome from "../../Shared/Welcome/Welcome";

 

const DonorDashboardHome = () => {
  const { user } = useAuth();

  return (
    <div>
      <Welcome
        user={{ displayName: user.displayName, role: "donor" }}
        customMessage="Thank you for being a lifesaver! ❤️"
      />
      {/* ...other donor dashboard content */}
    </div>
  );
};

export default DonorDashboardHome;
