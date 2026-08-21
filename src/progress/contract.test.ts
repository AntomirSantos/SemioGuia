import { MemoryProgressStore } from './memoryStore';
import { testarContratoProgressStore } from './contract';

testarContratoProgressStore('memória', async () => new MemoryProgressStore());
