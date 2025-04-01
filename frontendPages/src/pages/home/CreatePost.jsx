import { useState } from "react";

const CreatePost = () => {
	const [formData, setFormData] = useState({
		courseTitle: "",
		cgCriteria: "",
		prerequisites: "",
		maxStrength: "",
		courseOutline: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Course floated successfully");
		console.log(formData); // Log data for verification or API submission
	};

	return (
		<div className="flex flex-col gap-4 p-6 bg-white rounded shadow-md max-w-xl mx-auto">
			<h2 className="text-2xl font-bold text-center">Float a Course</h2>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div className="form-control">
					<label className="label font-medium">Course Title</label>
					<input
						type="text"
						name="courseTitle"
						className="input input-bordered w-full"
						placeholder="Enter course title"
						value={formData.courseTitle}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-control">
					<label className="label font-medium">Minimum CGPA Criteria</label>
					<input
						type="number"
						step="0.01"
						name="cgCriteria"
						className="input input-bordered w-full"
						placeholder="Enter CGPA criteria"
						value={formData.cgCriteria}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-control">
					<label className="label font-medium">Prerequisites</label>
					<textarea
						name="prerequisites"
						className="textarea textarea-bordered w-full"
						placeholder="Enter course prerequisites"
						value={formData.prerequisites}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-control">
					<label className="label font-medium">Maximum Strength</label>
					<input
						type="number"
						name="maxStrength"
						className="input input-bordered w-full"
						placeholder="Enter maximum number of students"
						value={formData.maxStrength}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-control">
					<label className="label font-medium">Course Outline</label>
					<textarea
						name="courseOutline"
						className="textarea textarea-bordered w-full"
						placeholder="Enter course outline"
						value={formData.courseOutline}
						onChange={handleInputChange}
						required
					/>
				</div>
				<button
					type="submit"
					className="btn btn-primary w-full text-white font-bold hover:bg-violet-600"
				>
					Float Course
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
