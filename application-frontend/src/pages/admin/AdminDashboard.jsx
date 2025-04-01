import "../../assets/styles/admin.css";
import AdminMain from "../../components/admin/AdminMain";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminDashboard = () => {
  return (
    <section className='admin-dashboard'>
      <AdminSidebar />
      <AdminMain />
    </section>
  );
};

export default AdminDashboard;
