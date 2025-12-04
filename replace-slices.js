const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'src', 'store', 'slices');

// Read new files
const cartSliceNew = fs.readFileSync(path.join(sourceDir, 'cartSlice.new.ts'), 'utf8');
const productsSliceNew = fs.readFileSync(path.join(sourceDir, 'productsSlice.new.ts'), 'utf8');
const userSliceNew = fs.readFileSync(path.join(sourceDir, 'userSlice.new.ts'), 'utf8');

// Write to original files
fs.writeFileSync(path.join(sourceDir, 'cartSlice.ts'), cartSliceNew);
fs.writeFileSync(path.join(sourceDir, 'productsSlice.ts'), productsSliceNew);
fs.writeFileSync(path.join(sourceDir, 'userSlice.ts'), userSliceNew);

// Delete new files
fs.unlinkSync(path.join(sourceDir, 'cartSlice.new.ts'));
fs.unlinkSync(path.join(sourceDir, 'productsSlice.new.ts'));
fs.unlinkSync(path.join(sourceDir, 'userSlice.new.ts'));

console.log('Redux slices have been successfully replaced!');
