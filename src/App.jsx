import Form from "./Form";
import SubmissionTable from "./SubmissionTable";

export default function App() {
  const isAdminPage = window.location.href.includes("page=form-submissions");

  return (
    <div className="tailwind-scope">
      {" "}
      {isAdminPage ? <SubmissionTable /> : <Form />}
    </div>
  );
}
