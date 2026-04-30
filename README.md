# MakeyDooey Website

A modular, responsive website for MakeyDooey - a modular embedded hardware platform with browser-based IDE.

## Features

- **Modular Architecture**: Clean separation of CSS, JavaScript, and HTML components
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **AI Hardware Recommender**: Get personalized hardware recommendations based on project ideas
- **Pre-order System**: Integrated with Supabase for customer data collection
- **Modern UI**: Clean, professional design with smooth animations

## Project Structure

```
websiteStore/
|-- css/                    # Modular CSS files
|   |-- variables.css       # CSS custom properties
|   |-- reset.css          # Base styles and reset
|   |-- navigation.css     # Navigation component styles
|   |-- hero.css           # Hero section styles
|   |-- recommender.css    # AI recommender styles
|   |-- components.css     # Common component styles
|   |-- shop.css           # Shop page styles
|   |-- modal.css          # Modal and form styles
|   |-- pages.css          # Contact and resources pages
|   |-- footer.css         # Footer styles
|   |-- responsive.css     # Mobile responsiveness
|-- js/                     # Modular JavaScript files
|   |-- main.js            # Main application entry point
|   |-- navigation.js      # Navigation and page routing
|   |-- modal.js           # Modal functionality
|   |-- recommender.js     # AI hardware recommender
|   |-- supabase.js        # Supabase integration
|-- components/             # HTML components
|   |-- navigation.html
|   |-- footer.html
|   |-- preorder-modal.html
|-- assets/                 # Static assets
|   |-- images/            # Images and logos
|-- index.html              # Main HTML file
|-- supabase-setup.md       # Supabase configuration guide
```

## Local Development

1. **Start a local server** (required for ES6 modules):
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Open in browser**:
   Navigate to `http://localhost:8000`

## Supabase Setup

To enable the pre-order form functionality:

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Choose a region and set database password

2. **Set up the Database Table**:
   - Follow the detailed instructions in `supabase-setup.md`
   - Create the `preorders` table with the required columns
   - Configure Row Level Security (RLS)

3. **Configure the JavaScript**:
   - Edit `js/supabase.js`
   - Replace placeholder values with your Supabase URL and anon key

4. **Test the Integration**:
   - Try submitting a pre-order form
   - Check data appears in your Supabase table

## Code Architecture

### CSS Modules
- **variables.css**: Central design tokens and custom properties
- **reset.css**: Base styles and browser normalization
- **Component-specific files**: Each major component has its own stylesheet
- **responsive.css**: Mobile-first responsive design

### JavaScript Modules
- **ES6 Modules**: Modern JavaScript with import/export
- **Separation of Concerns**: Each module handles specific functionality
- **Event-driven**: Uses event listeners instead of inline handlers
- **Error Handling**: Proper error handling and user feedback

### HTML Structure
- **Semantic HTML5**: Proper use of semantic elements
- **Data Attributes**: Uses `data-*` attributes for JavaScript hooks
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Features Overview

### Navigation System
- Single Page Application (SPA) routing
- Smooth page transitions
- Active state indicators
- Mobile-responsive menu

### AI Hardware Recommender
- Natural language project descriptions
- Integration with Claude AI API
- Real-time recommendations
- Loading states and error handling

### Pre-order Modal
- Product-specific forms
- Form validation
- Supabase integration
- Success states and follow-up actions

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized images and assets

## Deployment

### Static Hosting
The website can be deployed to any static hosting service:

- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for public repos
- **AWS S3**: Static website hosting

### Environment Variables
For production, ensure:
- Supabase URL and keys are properly configured
- API keys are secured (environment variables)
- HTTPS is enabled (required for Supabase)

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **ES6 Modules**: Requires modern browser support
- **CSS Grid/Flexbox**: Modern layout support
- **HTTPS**: Required for Supabase integration

## Contributing

1. Follow the existing modular structure
2. Use semantic HTML5 elements
3. Maintain responsive design principles
4. Test on multiple devices and browsers
5. Update documentation as needed

## License

Boston University ECE Senior Capstone · 2025-26