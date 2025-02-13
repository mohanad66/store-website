import React, { useEffect, useState } from 'react';
import Card from "../card/Card.jsx";
import "./Home.css"
import Navbar from "../navbar/Navbar.jsx"
export default function Home() {
    const [cardsData, setCardsData] = useState([]);
    const [originalCardsData, setOriginalCardsData] = useState([]); // New state variable
    const [sorts, setSort] = useState([]);
    const [selectedItem, setSelectenItem] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCardsData(data.products);
                setOriginalCardsData(data.products); // Set original cards data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDataSort = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products/categories");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSort(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDataSort();
    }, []);

    const handleSelect = (value) => {
        const fetchDataSort1 = async (value) => {
            if (value !== "All") {
                try {
                    const response = await fetch(`https://dummyjson.com/products/category/${value}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setCardsData(data.products);
                } catch (err) {
                    console.error(err);
                }
            } else {
                const fetchData = async () => {
                    try {
                        const response = await fetch("https://dummyjson.com/products")
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const data = await response.json();
                        setCardsData(data.products);
                        setOriginalCardsData(data.products); // Reset original cards data
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                fetchData();
            }
        };
        fetchDataSort1(value);
    };

    const handleSearhing = (search) => {
        if (search !== "") {
            setCardsData(originalCardsData.filter(card => card.title && card.title.toLowerCase().includes(search.toLowerCase())));
        } else {
            setCardsData(originalCardsData); // Reset to original cards data
        }
    };

    return (
        <div className='home'>
            <div className="filters">
                <div className="search">
                    <input type="text" onChange={(e) => { handleSearhing(e.target.value) }} placeholder='Search' />
                </div>
                <div className="sort">
                    <select name="" id="" value={selectedItem} onChange={(e) => {
                        handleSelect(e.target.value);
                        setSelectenItem(e.target.value);
                    }}>
                        <option value="All">All</option>
                        {sorts.map((sort) => (
                            <option key={crypto.randomUUID()} value={sort.slug}>{sort.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="cards-grid">
                {cardsData.map((card) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        img={card.images[0]} // Use the first image as a fallback
                        title={card.title}
                        price={card.price}
                        category={card.category}
                    />
                ))}
            </div>
        </div>
    );
}
