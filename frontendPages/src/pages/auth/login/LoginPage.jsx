import { Link } from "react-router-dom";
import { useState } from "react";
import image from '../../../components/svgs/image.jpg';

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const isError = false;

	return (
		<div className='max-w-screen-xl mx-auto flex h-screen px-10'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				{/* <SvgComponent className=' lg:w-2/3 fill-white' /> */}
                <img src={image} alt="Description of the image" className="lg:w-2/3" />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				{/* <form className='lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col w-[57rem] sm:w-full' onSubmit={handleSubmit}> */}
                <form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
					{/* <SvgComponent className='w-24 lg:hidden fill-white' /> */}
                    <img src={image} alt="Description of the image" className="w-24 lg:hidden" />
					<h1 className='text-4xl font-extrabold text-black'>Log In.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
                    {/* <div className='flex gap-4 flex-wrap'>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<FaUser />
							<input
								type='text'
								className='grow '
								placeholder='Username'
								name='username'
								onChange={handleInputChange}
								value={formData.username}
							/>
						</label>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='Full Name'
								name='fullName'
								onChange={handleInputChange}
								value={formData.fullName}
							/>
						</label>
					</div> */}
                    
                    {/* <label className="input input-bordered rounded flex items-center gap-2">
                    <span className="text-gray-500">Role</span>
                    <select
                        className="grow p-2 rounded border border-gray-300"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                        Select Role
                        </option>
                        <option value="Advisor">Advisor</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Student">Student</option>
                    </select>
                    </label> */}
					<Link to='/dashboard'>
					<button className='btn rounded-full btn-primary text-white  w-full'>Log In</button>
					</Link>
					{isError && <p className='text-red-500'>Something went wrong</p>}
				</form>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
					<p className='text-gray-500 text-lg'>Don't have an account?</p>
					<Link to='/signup'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign Up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;