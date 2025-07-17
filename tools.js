// الأدوات التفاعلية لموقع DeepLook

// مولد الشعارات
class LogoGenerator {
    constructor() {
        this.adjectives = [
            'مبدع', 'متقدم', 'ذكي', 'سريع', 'موثوق', 'احترافي', 'مبتكر', 'قوي',
            'Creative', 'Advanced', 'Smart', 'Fast', 'Reliable', 'Professional', 'Innovative', 'Powerful'
        ];
        
        this.suffixes = [
            'تك', 'برو', 'لاب', 'هب', 'سوليوشنز', 'جروب', 'ستوديو', 'ديجيتال',
            'Tech', 'Pro', 'Lab', 'Hub', 'Solutions', 'Group', 'Studio', 'Digital'
        ];
        
        this.colors = ['#1A202C', '#38B2AC', '#E53E3E', '#3182CE', '#38A169', '#D69E2E'];
    }

    generate(brandName) {
        if (!brandName || brandName.trim() === '') {
            return [];
        }

        const logos = [];
        const cleanName = brandName.trim();

        // توليد 5 شعارات مختلفة
        for (let i = 0; i < 5; i++) {
            const style = this.getRandomStyle();
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            
            logos.push({
                text: this.generateLogoText(cleanName, i),
                style: style,
                color: color,
                id: `logo-${i + 1}`
            });
        }

        return logos;
    }

    generateLogoText(name, index) {
        switch (index) {
            case 0:
                return name;
            case 1:
                const adj = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
                return `${adj} ${name}`;
            case 2:
                const suffix = this.suffixes[Math.floor(Math.random() * this.suffixes.length)];
                return `${name} ${suffix}`;
            case 3:
                return name.toUpperCase();
            case 4:
                return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            default:
                return name;
        }
    }

    getRandomStyle() {
        const styles = [
            'font-bold text-2xl',
            'font-light text-xl tracking-wide',
            'font-black text-3xl',
            'font-medium text-xl italic',
            'font-semibold text-2xl tracking-tight'
        ];
        return styles[Math.floor(Math.random() * styles.length)];
    }
}

// حاسبة تكلفة الحملة
class CostCalculator {
    constructor() {
        this.platforms = {
            facebook: {
                name: 'Facebook',
                baseCost: 0.5, // تكلفة أساسية لكل نقرة
                audienceMultiplier: {
                    small: 1,
                    medium: 1.5,
                    large: 2
                }
            },
            google: {
                name: 'Google Ads',
                baseCost: 1.2,
                audienceMultiplier: {
                    small: 1,
                    medium: 1.3,
                    large: 1.8
                }
            },
            instagram: {
                name: 'Instagram',
                baseCost: 0.7,
                audienceMultiplier: {
                    small: 1,
                    medium: 1.4,
                    large: 1.9
                }
            }
        };
    }

    calculate(platform, audienceSize, duration, budget = 1000) {
        if (!this.platforms[platform]) {
            return null;
        }

        const platformData = this.platforms[platform];
        const multiplier = platformData.audienceMultiplier[audienceSize] || 1;
        const dailyCost = (platformData.baseCost * multiplier * budget) / duration;
        const totalCost = dailyCost * duration;
        
        const estimatedClicks = Math.floor(totalCost / (platformData.baseCost * multiplier));
        const estimatedReach = estimatedClicks * (audienceSize === 'large' ? 10 : audienceSize === 'medium' ? 5 : 2);

        return {
            totalCost: Math.round(totalCost),
            dailyCost: Math.round(dailyCost),
            estimatedClicks: estimatedClicks,
            estimatedReach: estimatedReach,
            platform: platformData.name
        };
    }
}

// تهيئة الأدوات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const logoGenerator = new LogoGenerator();
    const costCalculator = new CostCalculator();

    // مولد الشعارات
    const logoForm = document.getElementById('logo-generator-form');
    const logoInput = document.getElementById('brand-name-input');
    const logoResults = document.getElementById('logo-results');

    if (logoForm && logoInput && logoResults) {
        logoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const brandName = logoInput.value;
            const logos = logoGenerator.generate(brandName);
            
            if (logos.length > 0) {
                displayLogos(logos);
            }
        });
    }

    function displayLogos(logos) {
        logoResults.innerHTML = '';
        logoResults.classList.remove('hidden');
        
        const title = document.createElement('h4');
        title.className = 'text-lg font-semibold mb-4';
        title.setAttribute('data-i18n', 'tools.logoGenerator.results');
        title.textContent = window.i18n ? window.i18n.t('tools.logoGenerator.results') : 'الشعارات المقترحة:';
        logoResults.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
        
        logos.forEach(logo => {
            const logoCard = document.createElement('div');
            logoCard.className = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border text-center';
            logoCard.innerHTML = `
                <div class=\"${logo.style}\" style=\"color: ${logo.color}\">${logo.text}</div>
            `;
            grid.appendChild(logoCard);
        });
        
        logoResults.appendChild(grid);
    }

    // حاسبة تكلفة الحملة
    const costForm = document.getElementById('cost-calculator-form');
    const platformSelect = document.getElementById('platform-select');
    const audienceRange = document.getElementById('audience-range');
    const durationInput = document.getElementById('duration-input');
    const costResults = document.getElementById('cost-results');

    if (costForm) {
        costForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const platform = platformSelect.value;
            const audienceSize = getAudienceSize(audienceRange.value);
            const duration = parseInt(durationInput.value);
            
            const result = costCalculator.calculate(platform, audienceSize, duration);
            
            if (result) {
                displayCostResults(result);
            }
        });
    }

    function getAudienceSize(value) {
        if (value <= 33) return 'small';
        if (value <= 66) return 'medium';
        return 'large';
    }

    function displayCostResults(result) {
        costResults.innerHTML = '';
        costResults.classList.remove('hidden');
        
        const title = document.createElement('h4');
        title.className = 'text-lg font-semibold mb-4';
        title.setAttribute('data-i18n', 'tools.costCalculator.result');
        title.textContent = window.i18n ? window.i18n.t('tools.costCalculator.result') : 'التكلفة التقديرية:';
        costResults.appendChild(title);

        const resultsCard = document.createElement('div');
        resultsCard.className = 'bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-lg';
        resultsCard.innerHTML = `
            <div class=\"grid grid-cols-2 gap-4 text-center\">
                <div>
                    <div class=\"text-2xl font-bold\">$${result.totalCost}</div>
                    <div class=\"text-sm opacity-90\">التكلفة الإجمالية</div>
                </div>
                <div>
                    <div class=\"text-2xl font-bold\">$${result.dailyCost}</div>
                    <div class=\"text-sm opacity-90\">التكلفة اليومية</div>
                </div>
                <div>
                    <div class=\"text-2xl font-bold\">${result.estimatedClicks}</div>
                    <div class=\"text-sm opacity-90\">النقرات المتوقعة</div>
                </div>
                <div>
                    <div class=\"text-2xl font-bold\">${result.estimatedReach}</div>
                    <div class=\"text-sm opacity-90\">الوصول المتوقع</div>
                </div>
            </div>
            <div class=\"mt-4 text-center text-sm opacity-90\">
                المنصة: ${result.platform}
            </div>
        `;
        
        costResults.appendChild(resultsCard);
    }

    // تحديث قيمة شريط التمرير
    if (audienceRange) {
        const audienceValue = document.getElementById('audience-value');
        audienceRange.addEventListener('input', (e) => {
            const value = e.target.value;
            let size = 'صغير';
            if (value > 66) size = 'كبير';
            else if (value > 33) size = 'متوسط';
            
            if (audienceValue) {
                audienceValue.textContent = size;
            }
        });
    }
});

