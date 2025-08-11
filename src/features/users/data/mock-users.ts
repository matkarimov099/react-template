import type { User } from '@/features/users/types.ts';

const firstNames = [
	'Ahmed', 'Ali', 'Anvar', 'Asror', 'Azim', 'Botir', 'Davron', 'Doniyor', 
	'Eldor', 'Farid', 'Gafur', 'Hakim', 'Islom', 'Jasur', 'Karim', 'Laziz', 
	'Mansur', 'Nodir', 'Otabek', 'Parviz', 'Ravshan', 'Sardor', 'Temur', 'Ulugbek',
	'Akmal', 'Bakhtiyor', 'Dilshod', 'Erkin', 'Farkhod', 'Gayrat', 'Hurshid', 
	'Ikrom', 'Jahongir', 'Komil', 'Lochin', 'Muzaffar', 'Nusrat', 'Oybek', 'Pulat'
];

const lastNames = [
	'Karimov', 'Akbarov', 'Nazarov', 'Rahimov', 'Yusupov', 'Mirzaev', 'Saidov',
	'Toshev', 'Umarov', 'Vorisov', 'Xolmatov', 'Yunusov', 'Zoirov', 'Abdullayev',
	'Bobojonov', 'Dadajonov', 'Ergashev', 'Fayzullayev', 'Gulomov', 'Hasanov',
	'Ibragimov', 'Jumaev', 'Kamilov', 'Latipov', 'Mamadjonov', 'Normatov',
	'Ortiqov', 'Pulatov', 'Qodirov', 'Rustamov', 'Salimov', 'Tursunov'
];

const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail.ru', 'example.com'];

function generateRandomDate(start: Date, end: Date): string {
	const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	return date.toISOString();
}

function generateRandomUser(id: number): User {
	const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	const domain = domains[Math.floor(Math.random() * domains.length)];
	
	const age = Math.floor(Math.random() * 50) + 18; // Age between 18-67
	const expenseCount = Math.floor(Math.random() * 100);
	const totalExpenses = (Math.random() * 50000 + 1000).toFixed(2);
	
	// Generate phone number in format +998 XX XXX XX XX
	const phoneCode = Math.floor(Math.random() * 100) + 10; // 10-109
	const phoneFirst = Math.floor(Math.random() * 900) + 100; // 100-999
	const phoneLast = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
	
	return {
		id: id.toString(),
		name: `${firstName} ${lastName}`,
		email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
		phone: `+998 ${phoneCode.toString().slice(-2)} ${phoneFirst} ${phoneLast.toString().slice(0, 2)} ${phoneLast.toString().slice(2)}`,
		age,
		created_at: generateRandomDate(new Date(2020, 0, 1), new Date()),
		expense_count: expenseCount,
		total_expenses: totalExpenses,
	};
}

// Generate 150 mock users
export const mockUsers: User[] = Array.from({ length: 150 }, (_, index) => 
	generateRandomUser(index + 1)
);

// Helper function to simulate API pagination and filtering
export function getMockUsersPage(
	page: number = 1, 
	limit: number = 25, 
	search?: string,
	sortBy?: string,
	sortOrder?: 'asc' | 'desc'
) {
	let filteredUsers = [...mockUsers];
	
	// Apply search filter
	if (search && search.length >= 3) {
		const searchLower = search.toLowerCase();
		filteredUsers = filteredUsers.filter(user => 
			user.name.toLowerCase().includes(searchLower) ||
			user.email.toLowerCase().includes(searchLower) ||
			user.phone.includes(searchLower)
		);
	}
	
	// Apply sorting
	if (sortBy && sortOrder) {
		filteredUsers.sort((a, b) => {
			const aVal = a[sortBy as keyof User];
			const bVal = b[sortBy as keyof User];
			
			if (typeof aVal === 'string' && typeof bVal === 'string') {
				const result = aVal.localeCompare(bVal);
				return sortOrder === 'desc' ? -result : result;
			}
			
			if (typeof aVal === 'number' && typeof bVal === 'number') {
				const result = aVal - bVal;
				return sortOrder === 'desc' ? -result : result;
			}
			
			return 0;
		});
	}
	
	const total = filteredUsers.length;
	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;
	const data = filteredUsers.slice(startIndex, endIndex);
	
	return {
		data,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};
}

// Helper function to get a single mock user by ID
export function getMockUserById(id: string): User | undefined {
	return mockUsers.find(user => user.id === id);
}

// Helper function to simulate user creation
export function createMockUser(userData: Omit<User, 'id' | 'created_at' | 'expense_count' | 'total_expenses'>): User {
	const newId = (mockUsers.length + 1).toString();
	const newUser: User = {
		...userData,
		id: newId,
		created_at: new Date().toISOString(),
		expense_count: 0,
		total_expenses: '0.00',
	};
	
	mockUsers.push(newUser);
	return newUser;
}

// Helper function to simulate user update
export function updateMockUser(id: string, updates: Partial<User>): User | null {
	const userIndex = mockUsers.findIndex(user => user.id === id);
	if (userIndex === -1) return null;
	
	mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
	return mockUsers[userIndex];
}

// Helper function to simulate user deletion
export function deleteMockUser(id: string): boolean {
	const userIndex = mockUsers.findIndex(user => user.id === id);
	if (userIndex === -1) return false;
	
	mockUsers.splice(userIndex, 1);
	return true;
}

// Helper function to simulate bulk user deletion
export function bulkDeleteMockUsers(ids: string[]): number {
	let deletedCount = 0;
	ids.forEach(id => {
		if (deleteMockUser(id)) {
			deletedCount++;
		}
	});
	return deletedCount;
}