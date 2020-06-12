const Department = require('../../models/department');

module.exports = {
	departments: async () => {
		try {
			const departments = await Department.find();
			return departments.map(department => {
				return { ...department._doc, _id: department.id };
			})
		}
		catch (err) {
			throw err;
		}
	},
	createDepartment: async (args) => {
		try {
			const department = Department({
				name: args.departmentInput.name,
				doctorsCount: 0,
				slots: args.departmentInput.slots,
				remainingSlots: 0,
			});
			const result = await department.save();
			return { ...result._doc, _id: result.id };
		}
		catch (err) {
			throw err;
		}
	}
}