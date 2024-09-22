import styles from "./page.module.css"; 
import Navbar from "@/Sections/Navbar"; 
import TodoList from "@/Sections/TodoList"; 

export default function Page() {
  return (
    <div className={styles.page}> 
      <Navbar />
      <TodoList />
    </div>
  );
}
