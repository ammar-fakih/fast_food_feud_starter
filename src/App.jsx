import * as React from 'react';
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from './data/dataset';
import './App.css';
import Header from './components/Header/Header';
import Instructions from './components/Instructions/Instructions';
import Chip from './components/Chip/Chip';
import NutritionalLabel from './components/NutritionalLabel/NutritionalLabel';

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
};
// or this!
const { data, categories, restaurants } = createDataSet();

export function App() {
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedRestaurant, setSelectedRestaurant] = React.useState('');
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('');

  const handleClick = (type, item) => {
    if (type === 'category') {
      setSelectedCategory(item);
    } else if (type === 'restaurant') {
      setSelectedRestaurant(item);
    } else {
      setSelectedMenuItem(item);
    }
  };

  const handleClose = (type) => {
    console.log("close", type)
    if (type === 'menu') {
      setSelectedMenuItem('');
    } else if (type === 'restaurant') {
      setSelectedRestaurant('');
    } else {
      setSelectedCategory('');
    }
    console.log(selectedRestaurant)
  };

  const currentMenuItems = data.filter((item) => {
    return (
      item.food_category === selectedCategory &&
      item.restaurant === selectedRestaurant
    );
  });

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((category) => {
            return (
              <Chip
                type={'category'}
                handleClose={handleClose}
                handleClick={handleClick}
                key={category}
                label={category}
                isActive={category === selectedCategory}
              />
            );
          })}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header
          title={appInfo.title}
          tagline={appInfo.tagline}
          description={appInfo.description}
        />

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {restaurants.map((restaurant) => {
              return (
                <Chip
                  type={'restaurant'}
                  handleClose={handleClose}
                  handleClick={handleClick}
                  key={restaurant}
                  label={restaurant}
                  isActive={restaurant === selectedRestaurant}
                />
              );
            })}
          </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions
          instructions={appInfo.instructions.start}
          start={appInfo.instructions.start}
          onlyCategory={appInfo.instructions.onlyCategory}
          onlyRestaurant={appInfo.instructions.onlyRestaurant}
          noSelectedItem={appInfo.instructions.noSelectedItem}
          allSelected={appInfo.instructions.allSelected}
        />

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {/* YOUR CODE HERE */}
            {currentMenuItems.map((item) => {
              return (
                <Chip
                  label={item.item_name}
                  key={item.item_name}
                  type="menu"
                  handleClose={handleClose}
                  handleClick={handleClick}
                  isActive={selectedMenuItem === item.item_name}
                />
              );
            })}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {/* YOUR CODE HERE */}
            {selectedMenuItem ? (
              <NutritionalLabel
                item={data.find((item) => {
                  return item.item_name === selectedMenuItem;
                })}
              />
            ) : null}
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
