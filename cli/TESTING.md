# CLI Testing Guide

This guide explains how to effectively test the CLI to prevent regressions when components change or are added.

## Test Structure

The CLI tests are organized into several categories:

### 1. **Unit Tests** (`utils.test.ts`)
- Test individual utility functions in isolation
- Mock external dependencies (GitHub, file system)
- Fast execution, high coverage

### 2. **Registry Validation** (`registry-validation.test.ts`)
- Validates `registry.json` structure and integrity
- Ensures all referenced files exist
- Verifies dependency chains are valid
- **Critical for preventing regressions when components are added/modified**

### 3. **Integration Tests** (`integration.test.ts`)
- Test end-to-end component installation
- Use temporary directories to avoid side effects
- Verify actual file operations work correctly

### 4. **Dependency Handling** (`dependency-handling.test.ts`)
- Test peer dependency checking
- Package manager detection
- Real project integration

### 5. **GitHub Fetching** (`github-fetch.test.ts`)
- Test network operations (mocked)
- Error handling for network failures
- URL construction

### 6. **Import Resolution** (`import-resolution.test.ts`)
- Test import path updates when files are moved
- Verify relative imports are handled correctly
- Ensure external imports remain unchanged

### 7. **Dependency Updates** (`update-dependencies.test.ts`)
- Test automatic dependency extraction from component files
- Verify peer dependency detection
- Test both local and GitHub-based scanning

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- registry-validation.test.ts
```

## Preventing Regressions

### When Adding a New Component

1. **Update `registry.json`** with the new component:
   ```json
   {
     "components": {
       "new-component": {
         "files": ["path/to/NewComponent.tsx"],
         "dependencies": ["theme", "brand"]
       }
     }
   }
   ```

2. **Run registry validation tests**:
   ```bash
   npm test -- registry-validation.test.ts
   ```
   
   These tests will catch:
   - Missing files
   - Invalid dependency references
   - Duplicate file paths
   - Broken dependency chains

3. **Verify the component can be installed**:
   ```bash
   npm test -- integration.test.ts
   ```

4. **Check dependency extraction**:
   ```bash
   npm test -- update-dependencies.test.ts
   ```
   
   This ensures new dependencies are detected if your component uses new packages.

### When Modifying an Existing Component

1. **Run all tests** to ensure nothing breaks:
   ```bash
   npm test
   ```

2. **Pay special attention to**:
   - `registry-validation.test.ts` - ensures file references are still valid
   - `integration.test.ts` - ensures installation still works
   - `update-dependencies.test.ts` - ensures new dependencies are detected

3. **If you change file paths**:
   - Update `registry.json`
   - Run `registry-validation.test.ts` to verify files exist
   - Run `integration.test.ts` to verify installation works

4. **If you add new dependencies**:
   - Run `update-dependencies.test.ts` to verify they're detected
   - Update `PEER_DEPENDENCIES` in `cli/index.ts` if needed
   - Update `KNOWN_PEER_DEPENDENCIES` in `cli/utils.ts` if needed

### When Changing Dependencies

1. **Update dependency arrays in `registry.json`**

2. **Run dependency validation**:
   ```bash
   npm test -- registry-validation.test.ts
   ```
   
   This will catch:
   - References to non-existent components
   - Circular dependencies
   - Invalid dependency chains

3. **Test dependency resolution**:
   ```bash
   npm test -- utils.test.ts
   ```
   
   Verify `resolveDependencies` still works correctly.

## Key Test Scenarios

### Registry Validation Checklist

Before committing changes, ensure:

- [ ] All files in `registry.json` exist in the project
- [ ] All dependencies reference existing components
- [ ] No circular dependencies exist
- [ ] All dependency chains can be resolved
- [ ] File paths use forward slashes (Unix-style)
- [ ] No duplicate file references

### Integration Test Checklist

- [ ] Components can be installed to a temporary directory
- [ ] Dependencies are installed in correct order
- [ ] Files are written correctly
- [ ] Overwrite flag works as expected
- [ ] Network errors are handled gracefully

### Dependency Update Checklist

- [ ] New external dependencies are detected
- [ ] Scoped packages are handled correctly (`@expo/vector-icons`)
- [ ] Relative imports are ignored
- [ ] Core dependencies (react, react-native) are always included

## Continuous Integration

These tests should run automatically on:

- Every pull request
- Every commit to main branch
- Before publishing new versions

## Best Practices

1. **Always run tests before committing**:
   ```bash
   npm test
   ```

2. **Add tests for new features**:
   - If you add a new utility function, add a test
   - If you change registry structure, update validation tests
   - If you add error handling, test error cases

3. **Keep tests fast**:
   - Use mocks for network operations
   - Use temporary directories for file operations
   - Avoid real GitHub API calls in tests

4. **Test edge cases**:
   - Missing files
   - Network failures
   - Invalid registry structure
   - Circular dependencies
   - Empty components

5. **Maintain test coverage**:
   - Aim for >80% coverage
   - Run `npm run test:coverage` regularly
   - Focus on critical paths (registry validation, installation)

## Troubleshooting

### Tests fail after adding a component

1. Check that all files in `registry.json` exist:
   ```bash
   npm test -- registry-validation.test.ts
   ```

2. Verify file paths are correct (relative to project root)

3. Ensure dependencies reference existing components

### Tests fail after modifying dependencies

1. Run dependency validation:
   ```bash
   npm test -- registry-validation.test.ts
   ```

2. Check for circular dependencies

3. Verify dependency chains can be resolved

### Integration tests fail

1. Check that mocked fetch responses match actual file structure

2. Verify temporary directory cleanup

3. Ensure file paths in mocks match actual project structure

## Example: Adding a New Component

```bash
# 1. Add component files to project
# 2. Update registry.json
# 3. Run validation tests
npm test -- registry-validation.test.ts

# 4. If validation passes, run all tests
npm test

# 5. Test actual installation (optional, manual)
cd /tmp
mkdir test-project && cd test-project
npm init -y
npx zero-to-app install your-component

# 6. Commit changes
git add .
git commit -m "Add new-component"
```

## Summary

The test suite is designed to catch regressions early:

- **Registry validation** catches structural issues
- **Integration tests** catch installation issues
- **Dependency tests** catch dependency resolution issues
- **Import tests** catch path resolution issues

Run tests frequently, especially when:
- Adding new components
- Modifying existing components
- Changing dependencies
- Updating file paths

