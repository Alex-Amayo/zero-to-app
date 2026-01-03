#!/bin/bash

echo "🔍 Verifying zero-to-app restructure..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# 1. Check file structure
echo "1. Checking file structure..."
if [ -d "cli" ] && [ -d "ui" ] && [ -d "theme" ] && [ -d "brand" ]; then
  echo -e "${GREEN}✅ Package files at root${NC}"
else
  echo -e "${RED}❌ Package files missing at root${NC}"
  ERRORS=$((ERRORS + 1))
fi

if [ -d "apps/showcase" ]; then
  echo -e "${GREEN}✅ Showcase in apps/showcase/${NC}"
else
  echo -e "${RED}❌ Showcase not in apps/showcase/${NC}"
  ERRORS=$((ERRORS + 1))
fi

# 2. Check key files
echo ""
echo "2. Checking key files..."
FILES=("cli/registry.json" "cli/config.ts" "package.json" "apps/showcase/package.json")
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✅ $file exists${NC}"
  else
    echo -e "${RED}❌ $file missing${NC}"
    ERRORS=$((ERRORS + 1))
  fi
done

# 3. Check GitHub config
echo ""
echo "3. Checking GitHub configuration..."
if grep -q "clean-slate" cli/config.ts 2>/dev/null; then
  echo -e "${GREEN}✅ Branch set to clean-slate${NC}"
else
  echo -e "${RED}❌ Branch not set correctly${NC}"
  ERRORS=$((ERRORS + 1))
fi

# 4. Check GitHub paths in code
echo ""
echo "4. Checking GitHub paths in code..."
if grep -q "cli/registry.json" cli/utils.ts 2>/dev/null && ! grep -q "zero-to-app/cli/registry.json" cli/utils.ts 2>/dev/null; then
  echo -e "${GREEN}✅ Registry path updated (no zero-to-app/ prefix)${NC}"
else
  echo -e "${RED}❌ Registry path not updated correctly${NC}"
  ERRORS=$((ERRORS + 1))
fi

# 5. Check test paths
echo ""
echo "5. Checking test paths..."
if grep -q "apps/showcase" cli/__tests__/dependency-handling.test.ts 2>/dev/null; then
  echo -e "${GREEN}✅ Test paths updated${NC}"
else
  echo -e "${RED}❌ Test paths not updated${NC}"
  ERRORS=$((ERRORS + 1))
fi

# 6. Test GitHub URLs (if online)
echo ""
echo "6. Testing GitHub URLs..."
REGISTRY_URL="https://raw.githubusercontent.com/Alex-Amayo/zero-to-app/clean-slate/cli/registry.json"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$REGISTRY_URL" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✅ Registry URL accessible (HTTP $HTTP_CODE)${NC}"
elif [ "$HTTP_CODE" = "000" ]; then
  echo -e "${YELLOW}⚠️  Cannot test GitHub URL (offline or not pushed yet)${NC}"
  echo "   URL: $REGISTRY_URL"
else
  echo -e "${YELLOW}⚠️  Registry URL returned HTTP $HTTP_CODE${NC}"
  echo "   URL: $REGISTRY_URL"
  echo "   (Files may not be pushed to GitHub yet)"
fi

# 7. Check build config
echo ""
echo "7. Checking build configuration..."
if [ -f "tsup.config.ts" ] && grep -q "cli/index.ts" tsup.config.ts; then
  echo -e "${GREEN}✅ Build config present${NC}"
else
  echo -e "${RED}❌ Build config missing or incorrect${NC}"
  ERRORS=$((ERRORS + 1))
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✅ All checks passed!${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Install dependencies: npm install"
  echo "2. Build: npm run build"
  echo "3. Test: npm test"
  echo "4. Push to GitHub (clean-slate branch)"
  echo "5. Test CLI: npx zero-to-app install button"
else
  echo -e "${RED}❌ Found $ERRORS issue(s)${NC}"
  exit 1
fi

