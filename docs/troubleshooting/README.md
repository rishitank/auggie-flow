# Claude-Flow Troubleshooting Guide

This directory contains comprehensive troubleshooting documentation for common issues and their solutions.

## 📋 Available Guides

### [NPX Cache Conflicts](./npx-cache-conflicts.md)
**Issue**: ENOTEMPTY errors when running multiple auggie-flow instances concurrently
**Solution**: Automatic per-process cache isolation (v2.0.0-alpha.17+)
**Symptoms**: 
```
npm error code ENOTEMPTY
npm error syscall rename
npm error ENOTEMPTY: directory not empty, rename '[source]' -> '[dest]'
```

## 🚀 Quick Diagnosis

### Common Error Patterns

| Error Pattern | Guide | Fix |
|---------------|-------|-----|
| `ENOTEMPTY: directory not empty` | [NPX Cache Conflicts](./npx-cache-conflicts.md) | Upgrade to alpha.17+ or use isolated cache |
| `npm ERR! code ENOTEMPTY` | [NPX Cache Conflicts](./npx-cache-conflicts.md) | Per-process cache isolation |

### Environment Issues

**Multiple concurrent operations failing?**
→ See [NPX Cache Conflicts](./npx-cache-conflicts.md)

**Swarm operations not working?**
→ Check for ENOTEMPTY errors in [NPX Cache Conflicts](./npx-cache-conflicts.md)

**Batch initialization failing?**
→ Review [NPX Cache Conflicts](./npx-cache-conflicts.md) for concurrent operation fixes

## 🔧 General Troubleshooting Steps

1. **Check your version**: Ensure you're using the latest alpha release
   ```bash
   npx auggie-flow@alpha --version
   ```

2. **Clear NPX cache** (if using older versions):
   ```bash
   npm cache clean --force
   rm -rf ~/.npm/_npx
   ```

3. **Run diagnostics**:
   ```bash
   npx auggie-flow@alpha init --dry-run
   ```

4. **Test concurrent safety** (alpha.17+):
   ```bash
   # Run included test suites
   node test/npx-cache-fix-test.js
   node test/npx-isolation-integration-test.js
   ```

## 📞 Getting Help

If you don't find your issue here:

1. **Search existing issues**: [GitHub Issues](https://github.com/ruvnet/auggie-flow/issues)
2. **Check the logs**: Look for specific error patterns in the troubleshooting guides
3. **Create a new issue**: Include error messages and steps to reproduce

## 🔄 Version-Specific Notes

### v2.0.0-alpha.17+
- ✅ NPX cache conflicts resolved with automatic isolation
- ✅ True parallel execution maintained
- ✅ Zero performance overhead

### Earlier versions
- ⚠️ May experience ENOTEMPTY errors with concurrent operations
- 🔧 Use workarounds from [NPX Cache Conflicts](./npx-cache-conflicts.md)

## 🧪 Testing Your Fix

After applying any fixes, verify with:

```bash
# Basic functionality
npx auggie-flow@alpha init --minimal --force

# Concurrent safety (alpha.17+)
node test/npx-cache-fix-test.js
```

## 📚 Additional Resources

- [Main Documentation](../README.md)
- [CLI Reference](../cli-reference.md)
- [GitHub Issues](https://github.com/ruvnet/auggie-flow/issues)
- [Alpha Release Notes](../../CHANGELOG.md)