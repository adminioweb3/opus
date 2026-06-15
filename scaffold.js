const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app');

const routes = [
  // Public
  '(public)/features', '(public)/solutions', '(public)/pricing', '(public)/customers', 
  '(public)/resources', '(public)/blog', '(public)/blog/[slug]', '(public)/case-studies', 
  '(public)/case-studies/[slug]', '(public)/about', '(public)/careers', '(public)/contact', 
  '(public)/privacy', '(public)/terms', '(public)/security', '(public)/changelog', '(public)/status',
  // Auth
  '(auth)/login', '(auth)/register', '(auth)/forgot-password', '(auth)/reset-password', 
  '(auth)/verify-email', '(auth)/two-factor-auth',
  // Dashboard
  '(dashboard)/dashboard', '(dashboard)/dashboard/monitoring', '(dashboard)/dashboard/brand', 
  '(dashboard)/dashboard/competitors', '(dashboard)/dashboard/models', '(dashboard)/dashboard/analytics', 
  '(dashboard)/dashboard/reports', '(dashboard)/dashboard/alerts', '(dashboard)/dashboard/team', 
  '(dashboard)/dashboard/settings', '(dashboard)/dashboard/billing', '(dashboard)/dashboard/integrations',
  // Admin
  '(admin)/admin', '(admin)/admin/users', '(admin)/admin/organizations', '(admin)/admin/billing', 
  '(admin)/admin/subscriptions', '(admin)/admin/features', '(admin)/admin/analytics', 
  '(admin)/admin/logs', '(admin)/admin/tickets'
];

routes.forEach(route => {
  const dirPath = path.join(baseDir, route);
  fs.mkdirSync(dirPath, { recursive: true });
  
  let componentName = route.split('/').pop().replace(/\[|\]|-/g, '');
  if (!componentName) componentName = 'Index';
  componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  
  const content = `export default function ${componentName}Page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">${route}</h1>
      <p className="text-muted-foreground">This page is under construction.</p>
    </div>
  )
}
`;
  
  const filePath = path.join(dirPath, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
});

console.log('Successfully scaffolded ' + routes.length + ' routes!');
