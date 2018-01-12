import { expect } from 'chai'
import { join } from 'path'

const pkg = join(__dirname, '..')

describe('package', function() {
  this.timeout(60000)
  it('should activate', async () => {
    const packages: any = atom.packages

    // Load package, but it won't activate until the grammar is used
    const promise = atom.packages.activatePackage(pkg)

    packages.triggerActivationHook('language-haskell:grammar-used')
    packages.triggerDeferredActivationHooks()

    await promise

    expect(atom.packages.isPackageActive('ide-haskell')).to.equal(true)
  })
})
