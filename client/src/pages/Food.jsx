import { useState, useEffect, useCallback } from 'react';

export default function Food() {
    const [foodData, setFoodData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);

    // Initial expected values for protein, calories, etc.
    const expectedProtein = 150; // Example expected protein value
    const expectedCalories = 2000; // Example expected calorie value

    // Fetch data from data.json
    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();
                setFoodData(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };
        fetchFoodData();
    }, []);

    const handleSearch = useCallback(() => {
        if (foodData) {
            const results = Object.keys(foodData)
                .filter((foodKey) =>
                    foodKey.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((foodKey) => ({
                    name: foodKey,
                    ...foodData[foodKey],
                }));
            setSearchResults(results);
        }
    }, [foodData, searchQuery]);

    const addFood = (food) => {
        setSelectedFoods((prev) => {
            const existingFood = prev.find((item) => item.name === food.name);
            if (existingFood) {
                return prev.map((item) =>
                    item.name === food.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { ...food, quantity: 1 }];
            }
        });
    };

    const adjustQuantity = (foodName, increment) => {
        setSelectedFoods((prev) =>
            prev
                .map((food) =>
                    food.name === foodName
                        ? { ...food, quantity: Math.max(0, food.quantity + increment) }
                        : food
                )
                .filter((food) => food.quantity > 0)
        );
    };

    const totalProtein = selectedFoods.reduce(
        (sum, food) => sum + food.protein * food.quantity,
        0
    );
    const totalCalories = selectedFoods.reduce(
        (sum, food) => sum + food.calories * food.quantity,
        0
    );
    const totalCarbs = selectedFoods.reduce(
        (sum, food) => sum + food.carbs * food.quantity,
        0
    );
    const totalFats = selectedFoods.reduce(
        (sum, food) => sum + food.fats * food.quantity,
        0
    );

    const remainingProtein = Math.max(0, expectedProtein - totalProtein);
    const remainingCalories = Math.max(0, expectedCalories - totalCalories);
    const remainingCarbs = Math.max(0, expectedProtein * 4 + expectedCalories - totalCarbs); // Adjust calculation as needed
    const remainingFats = Math.max(0, expectedProtein * 4 + expectedCalories - totalFats); // Adjust calculation as needed



    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Fitness Calculator</h1>

            <div className="flex mb-6">
                <input
                    type="text"
                    placeholder="Search for food..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        handleSearch();
                    }}
                    className="flex-grow px-4 py-2 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="px-6 py-2 text-lg text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <h2 className="text-xl font-semibold p-4 bg-blue-500 text-white">Food Selection</h2>
                    <div className="p-4">
                        {searchResults.length > 0 ? (
                            <ul className="space-y-2">
                                {searchResults.map(food => (
                                    <li key={food.name} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                        <span>{food.name} - {food.protein}g protein, {food.carbs}g carbs, {food.fats}g fats, {food.calories} calories per {food.quantity}</span>
                                        <button
                                            onClick={() => addFood(food)}
                                            className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            +
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">Search for food items to add them to your list.</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <h2 className="text-xl font-semibold p-4 bg-blue-500 text-white">Selected Foods</h2>
                    <div className="p-4">
                        <ul className="space-y-4">
                            {selectedFoods.map(food => (
                                <li key={food.name} className="flex items-center justify-between">
                                    <span className="bg-gray-100 text-sm px-2 py-1 rounded">100g</span>
                                    <span className="flex-grow ml-3">{food.name}</span>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => adjustQuantity(food.name, -1)}
                                            className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 py-1 font-semibold">{food.quantity}</span>
                                        <button
                                            onClick={() => adjustQuantity(food.name, 1)}
                                            className="px-2 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            +
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="text-xl font-semibold p-4 bg-blue-500 text-white">Nutrition Totals</h2>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Total Protein:</span>
                        <span className="text-lg font-bold">{totalProtein.toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Total Carbs:</span>
                        <span className="text-lg font-bold">{totalCarbs.toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Total Fats:</span>
                        <span className="text-lg font-bold">{totalFats.toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Total Calories:</span>
                        <span className="text-lg font-bold">{totalCalories.toFixed(1)}</span>
                    </div>
                    <div className="mt-4 border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold">Expected Protein:</span>
                            <span className="text-lg font-bold">{expectedProtein}g</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold">Expected Calories:</span>
                            <span className="text-lg font-bold">{expectedCalories}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold">Remaining Protein:</span>
                            <span className="text-lg font-bold">{remainingProtein}g</span>
                        </div>
                        {/* <div className="flex justify-between items-center */}
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold">Remaining Calories:</span>
                            <span className="text-lg font-bold">{remainingCalories}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold">Remaining Carbs:</span>
                            <span className="text-lg font-bold">{remainingCarbs}g</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold">Remaining Fats:</span>
                            <span className="text-lg font-bold">{remainingFats}g</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}