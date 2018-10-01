import imgPizza from './img/pizza.jpg'
import imgChilli from './img/chilli.jpg'
import imgChickenCas from './img/chickenCas.jpg'
import imgChickenBom from './img/bombayChicken.jpg'
import imgBurger from './img/burger.jpg'
import imgPotato from './img/potato.jpg'
import imgCrumble from './img/crumble.jpg'
import imgCurry from './img/curry.jpg'
import imgLasagne from './img/lasagne.jpg'

const recipeDB = {
    testimonialsData: [
        '"Made some really tasty treats from this site. They didn\'t turn out as nice as the pictures though since they are pros and I am not.."',
        '"This is the greatest recipe website I have ever been to!!! This website is wonderful!!!"',
        '"I\'ve only recently been introduced to this site, but I really love it."',
        '"Just makes me hungry looking at all of those photos. I don\'t think people realize what an art form it is to take photos of food, some people somehow make a career of just taking photos of yummy food."'
    ],  
    meal: [
        {
            id: 1,
            name: "Pizza Dough",
            ingredients: [
                "1/2 cups (355 ml) warm water",
                "package (2 1/4 teaspoons) of active dry yeast",
                "3/4 cups (490 g) bread flour",
                "2 Tbsp olive oil (omit if cooking pizza in a wood-fired pizza oven)",
                "1 teaspoons salt",
                "1 teaspoon sugar"
            ],
            method: "1 Proof the yeast: Place the warm water in the large bowl of a heavy duty stand mixer. Sprinkle the yeast over the warm water and let it sit for 5 minutes until the yeast is dissolved. 2 Make and knead the pizza dough: Using the mixing paddle attachment, mix in the flour, salt, sugar, and olive oil on low speed for a minute. Then replace the mixing paddle with the dough hook attachment.",
            image: imgPizza
        },
        {
            id: 2,
            name: "Chicken Casserole",
            ingredients: [
                "knob of butter",
                "1/2 tbsp rapeseed or olive oil",
                "1 ½ tbsp flour",
                "650g boneless, skinless chicken",
                "3 garlic cloves, crushed",
                "400g baby new potatoes",
                "2 sticks celery",
                "2 carrots",
                "250g mushrooms, quartered"
            ],
            method: "Heat a knob of butter and ½ tbsp rapeseed or olive oil in a large frying pan, cook 1 finely chopped large onion for 8-10 mins until softened and starting to caramelise. Meanwhile, put 1 ½ tbsp flour and a little salt and pepper in a bowl and toss 650g boneless, skinless chicken thigh fillets in it.",
            image: imgChickenCas
        },
        {
            id: 3,
            name: "Bombay Chicken",
            ingredients: [
                "1 small whole chicken",
                "5 tbsp tikka masala paste",
                "1 tbsp sunflower oil",
                "1 large red onion, halved and sliced",
                "2 large tomatoes, halved and chopped",
                "1 tbsp fenugreek seeds",
                "1 thumb-sized piece ginger"
            ],
            method: "Heat oven to 220C/200C fan/gas 6. Put the chicken on a chopping board and, using your hands, rub the skin generously with half the spice paste. Season well, tie the legs together and set aside. Heat the oil in a large flameproof casserole dish over a medium heat. Add the onion and a good pinch of salt and cook for 5 mins or until beginning to soften. Add the tomatoes, fenugreek seeds, ginger and remaining spice paste, and cook for 3 mins more. Stir through the coconut milk and bring to a simmer. Add the chicken and the potatoes to the dish, and cook in the oven for 20 mins, uncovered.",
            image: imgChickenBom
        },
        {
            id: 4,
            name: "Chilli",
            ingredients: [
                "1 tbsp rapeseed oil",
                "1 large onion",
                "2 garlic cloves, crushed",
                "2 tsp ground cumin",
                "1 ½ tsp sweet smoked paprika",
                "1 tsp mild chilli"
            ],
            method: "Heat the oil in a heavy-based pan. Cook the onion for 10 mins until softened and starting to caramelise. Add the garlic and spices and cook for a further 1-2 mins. Transfer to a slow cooker, along with the diced vegetables, mince, chopped tomatoes, stock cube and tomato purée. Stir well. Cook on low for 6-7 hours. About half an hour before serving, take off the lid and use a stick blender to blend in the vegetables (if your children aren’t keen to eat veg) or leave chunky. Stir through the lentils and flageolet beans.",
            image: imgChilli
        },
        {
            id: 5,
            name: "Burger",
            ingredients: [
                "1 chicken breast",
                "1 tsp chipotle paste",
                "1 lime juiced",
                "1-2 slices cheese",
                "1 brioche bun, split",
                "2 cherry tomatoes, chopped",
                "3-4 pickled jalapeño slices, chopped",
                "½ small garlic clove, finely grated"
            ],
            method: "Put the chicken breast between two pieces of cling film and bash with a rolling pin or pan to about 1cm thick. Mix the chipotle paste with half the lime juice and spread over the chicken.Heat a griddle pan over a high heat. Once hot, cook the chicken for 3 mins each side until cooked through, adding the cheese for the final 2 mins of cooking. Add the bun, cut-side down, to the griddle pan to toast lightly. Season the chicken.",
            image: imgBurger
        },
        {
            id: 6,
            name: "Baked Potato",
            ingredients: [
                "4 large baking potatoes",
                "2 tsp olive oil",
                "200ml soured cream",
                "50g cheddar grated",
                "4 crispy bacon rashers, chopped",
                "4 spring onions thinly sliced"
            ],
            method: "Heat oven to 220C/200C fan/gas 7. Rub 2 tsp olive oil over 4 large baking potatoes and put on the top shelf of the oven. Bake for 20 mins, then turn down the oven to 190C/170C fan/gas 5 and bake for 45 mins-1 hr until the skin is crisp and the flesh soft.",
            image: imgPotato
        },
        {
            id: 7,
            name: "Crumble",
            ingredients: [
                "500g rhubarb chopped into chunks the length of your thumb",
                "100g golden caster sugar",
                "3 tbsp port (optional)",
                "140g self-raising flour",
                "85g butter chilled",
                "50g light brown muscovado sugar",
                "50g chopped walnuts (optional)"
            ],
            method: "Tip 500g thumb-length chunks of rhubarb into a saucepan with 100g golden caster sugar and 3 tbsp port, if using. Cover and simmer on a very low heat for 15 mins, adding more sugar if you want. When soft (but still holding its shape) and sweet enough, pour the rhubarb into a medium baking dish. Heat oven to 200C/180C fan/gas 6.",
            image: imgCrumble
        },
        {
            id: 8,
            name: "Curry",
            ingredients: [
                "1 large onion",
                ", roughly chopped",
                "3 tbsp mild curry paste",
                "400g can chopped tomatoes",
                "2 tsp vegetable bouillon powder",
                "1 tbsp finely chopped ginger",
                "1 yellow pepper, deseeded and chopped",
                "2 skinless chicken legs, fat removed",
                "30g pack fresh coriander, leaves chopped",
                "cooked brown rice"
            ],
            method: "Put 1 roughly chopped large onion, 3 tbsp mild curry paste, a 400g can chopped tomatoes, 2 tsp vegetable bouillon powder, 1 tbsp finely chopped ginger and 1 chopped yellow pepper into the slow cooker pot with a third of a can of water and stir well. Add 2 skinless chicken legs, fat removed, and push them under all the other ingredients so that they are completely submerged. Cover with the lid and chill in the fridge overnight. The next day, cook on Low for 6 hrs until the chicken and vegetables are really tender.",
            image: imgCurry
        },
        {
            id: 9,
            name: "Lasagne",
            ingredients: [
                "250g pack fresh lasagne sheets",
                "olive oil for greasing",
                "large handful grated parmesan",
                "110g unsalted butter",
                "1 celery stick, finely chopped",
                "1 carrot finely chopped",
                "1 small red onion, finely chopped",
                "25g dried porcini, soaked for 10 mins in hot water, drained and roughly chopped",
                "1 rosemary",
                "1kg trimmed beef or veal flank, finely chopped (ask your butcher to do this for you)",
                "125ml dry white wine",
                "400g can good-quality chopped tomatoes"
            ],
            method: "For the ragu, melt the butter in a large flameproof casserole dish over a medium heat until foaming. Add the celery, carrot, onion, porcini, rosemary and some seasoning, and fry for 5 mins. Season the meat, add to the dish and cook for 5 mins until browned. Pour in the wine, add the tomatoes and bring to the boil. Reduce the heat to low, put the lid on the dish and cook for 1hr 30 mins, removing the lid for the final 30 mins so the sauce can reduce. The meat should be tender but not too broken up, and the sauce should be thick. Taste for seasoning. You can cook it for longer if you have time - the flavour will only improve.",
            image: imgLasagne

        }]
}

export default recipeDB