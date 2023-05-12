import os = require('os');
import si = require('systeminformation');

const getinfo = async () => {
    const cpu = await si.cpu();
    const disk = (await si.diskLayout())[0];
    const os = await si.osInfo();
    const versions = await si.versions();
    const ram = await si.mem();
    let info = {};
    info["CPU"] = {
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      speed: cpu.speed
    }
    info["Cores"] = {
      cores: cpu.cores,
      physicalCores: cpu.physicalCores
    };
    const totalRam = Math.round(ram.total / 1024 / 1024 / 1024); // RAM Info
    info["RAM"] = totalRam;
    const size = Math.round(disk.size / 1024 / 1024 / 1024);
    info["Disk"] = {
      vendor: disk.vendor,
      name: disk.name,
      size,
      type: disk.type,
      interfaceType: disk.interfaceType
    }; // Disk Info
    info["OS"] = {
      distro: os.distro,
      codename: os.codename,
      platform: os.platform
    }; //OS Info
    info["Kernel"] = {
      kernel: os.kernel,
      arch: os.arch
    }
    info["Node"] = versions.node; // Node Info
    info["V8"] = versions.v8;
    return info;
}

module.exports = getinfo