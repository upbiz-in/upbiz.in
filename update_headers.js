const fs = require('fs');
const files = [
  'index.html', 'about.html', 'services.html', 'blog.html', 
  'contact.html', 'generic.html', 'single.html', 'styles.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  const menuMatch = content.match(/<ul class="s-header__menu-links">([\s\S]*?)<\/ul>/);
  let menuInner = menuMatch ? menuMatch[1] : '';

  const newCta = `    <div class="s-header__contact">
        <a href="contact.html" class="button" style="--clr: #14962B">
          <span class="button__icon-wrapper">
            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="button__icon-svg" width="10">
              <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
            </svg>
            <svg viewBox="0 0 14 15" fill="none" width="10" xmlns="http://www.w3.org/2000/svg" class="button__icon-svg button__icon-svg--copy">
              <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
            </svg>
          </span>
          Explore All
        </a>
    </div>`;

  const newHeader = `<header class="s-header">
    <div class="s-header__logo">
        <a class="logo" href="index.html">
            <img src="images/therealupbizlogo.png" alt="Homepage">
        </a>
        <a class="s-header__menu-toggle" href="#0"><span>Menu</span></a>
    </div>

    <nav class="s-header__nav">
        <ul class="s-header__menu-links">${menuInner}</ul>
    </nav>

${newCta}
</header> <!-- end s-header -->`;

  content = content.replace(/<header class="s-header">[\s\S]*?<\/header>\s*<!-- end s-header -->/, newHeader);
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
