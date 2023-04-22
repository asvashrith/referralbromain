import React from 'react';
import '../Css/footer.css';
import { useNavigate } from "react-router-dom";
import AdminPage from '../admin/AdminPage';



const Footerpage = () => {
    // const nav = useNavigate()

return(
    <div class='footermain'>
<footer className="footer">
	<button class = "Admin" onClick={admin()}>A's</button>

</footer>
</div>
)
function admin() {
    
    // nav('/admin')
}
}
export default Footerpage;
